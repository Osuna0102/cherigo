import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { client } from '../lib/client';

const languageMapping = {
  'My Hero Academia': ['My Hero Academia', '僕のヒーローアカデミア', 'Boku no Hīrō Akademia', 'ぼくのヒーローアカデミア'],
  // Add more mappings as needed
};

const normalizeSearchTerm = (term) => {
  for (const [key, values] of Object.entries(languageMapping)) {
    if (values.some(value => value.includes(term))) {
      return key.toLowerCase();
    }
  }
  return term.toLowerCase();
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const query = '*[_type == "product"]';
      try {
        const productsData = await client.fetch(query);
        setProducts(productsData);
        setFilteredProducts(productsData);
        const allCategories = [...new Set(productsData?.flatMap(product => product.categories))];
        setCategories(allCategories);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterProducts(e.target.value, selectedCategory);
  };

  const filterProducts = (searchTerm, category) => {
    const normalizedTerm = normalizeSearchTerm(searchTerm);
    let filtered = products?.filter(product =>
      normalizeSearchTerm(product.name).includes(normalizedTerm)
    );
    if (category) {
      filtered = filtered.filter(product => product.categories.includes(category));
    }
    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category) => {
    const newCategory = selectedCategory === category ? '' : category;
    setSelectedCategory(newCategory);
    filterProducts(searchTerm, newCategory);
  };

  return (
    <div className="w-full max-w-full p-4"  style={{ backgroundImage: "url('/assets/shop-bg.png')", backgroundSize: 'cover'}}>
      {/* <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1> */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded bg-[#ffbdbf] text-[#fff6e1] placeholder-[#fff6e1] focus:outline-none focus:ring-2 focus:ring-[#ffbd59]"
        />
      </div>
      <div className="flex justify-center mb-4 space-x-2">
        {categories?.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`ml-4 px-4 py-2 text-[24px] font-bold font-fredoka rounded-full hover:bg-[#eb8194] hover:text-white transition-colors duration-300 ${selectedCategory === category ? 'bg-[#ffbdbf] text-[#fff6e1]' : 'bg-[#c0d763] text-[#fff6e1]'}`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        slidesPerView={3}
        spaceBetween={30}
        className="w-full h-full"
        style={{ paddingTop: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}
      >
        {filteredProducts?.map((product) => (
          <SwiperSlide key={product._id} className="flex justify-center items-center">
            <ItemCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Products;