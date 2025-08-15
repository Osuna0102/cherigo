import React, { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { client } from '../lib/client';
import { useLanguage } from '../lib/languageContext';


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
  //const [filteredProducts, setFilteredProducts] = useState([]);
  //const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const {language} = useLanguage();


  useEffect(() => {
    const fetchProducts = async () => {
      const query = '*[_type == "product"]';
      try {
        const productsData = await client.fetch(query);
        setProducts(productsData);
        //setFilteredProducts(productsData);
        //const allCategories = [...new Set(productsData?.flatMap(product => product.categories))];
        //setCategories(allCategories);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    //filterProducts(e.target.value, selectedCategory);
  };

  // 1️⃣ Extract unique categories from products
  const categories = Array.from(
    products.reduce((map, product) => {
      product.categories?.forEach(cat => {
        const key = cat?.en || ''; // Use English name as the uniqueness key
        if (key && !map.has(key)) {
          map.set(key, cat);
        }
      });
      return map;
    }, new Map()).values()
  );

  /* const filterProducts = (searchTerm, category) => {
    // If search is empty and no category is selected, show all products
    if (!searchTerm.trim() && !category) {
      setFilteredProducts([...products]);
      return;
    }
  
    const normalizedTerm = normalizeSearchTerm(searchTerm || '');
    
    // First filter by search term if present
    let filtered = products?.filter(product =>
      !searchTerm.trim() || normalizeSearchTerm(product.name[language] || '').includes(normalizedTerm)
    );
  
    // Then filter by category if selected (case-insensitive comparison)
    if (category) {
      filtered = filtered.filter(product => 
        product.categories?.some(cat => cat[language].toLowerCase() === category.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }; */

  const handleCategoryClick = (category) => {
    //const newCategory = selectedCategory === category ? '' : category;
    setSelectedCategory(category);
    //filterProducts(searchTerm, newCategory);
  };

  // 3️⃣ Filter products based on selected category & search term
  const filteredProducts = products.filter(product => {
    const name = product?.name?.[language] || '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? product.categories?.some(
          cat => (cat?.[language] || '').toLowerCase() === selectedCategory.toLowerCase()
        )
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div 
      className="w-full min-h-screen overflow-x-hidden" 
      style={{ backgroundImage: "url('/assets/shop-bg.png')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}
    >
      {/* Content container with max-width */}
      <div className="flex justify-center w-full px-2 sm:px-4">
        <div className="max-w-[1400px] w-full p-2 sm:p-4">
          
          <div className="mb-4">
            <input
              type="text"
              placeholder={language === 'ja' ? '商品検索...' : 'Search products...'}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border rounded bg-[#ffbdbf] text-[#fff6e1] placeholder-[#fff6e1] focus:outline-none focus:ring-2 focus:ring-[#ffbd59]"
            />
          </div>
          
           {/* 🏷 Category Buttons */}
      <div className="flex flex-wrap justify-center mb-4 gap-2">
        <button
          onClick={() => handleCategoryClick('')}
          className={`px-3 py-1 sm:px-4 sm:py-2 text-base sm:text-lg md:text-[24px] font-bold font-fredoka rounded-full hover:bg-[#eb8194] text-white transition-colors duration-300  ${
            selectedCategory === '' ? 'bg-[#ffbdbf]' : 'bg-[#c0d763]'
          }`}
        >
          {language === 'ja' ? 'すべて' : 'All'}
        </button>

        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category?.[language] || '')}
            className={`px-3 py-1 sm:px-4 sm:py-2 text-base sm:text-lg md:text-[24px] font-bold font-fredoka rounded-full hover:bg-[#eb8194] text-white transition-colors duration-300  ${
              selectedCategory === category?.[language]
                ? 'bg-[#ffbdbf]'
                : 'bg-[#c0d763]'
            }`}
          >
            {category?.[language] || ''}
          </button>
        ))}
      </div>
          
          <div className="border-t-2 border-[#ffbd59] mb-4 my-4"></div>
          
          <div className="w-full min-h-[60vh] py-4 sm:py-6">
            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="flex justify-center items-center w-full">
                    <ItemCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[40vh]">
                <div className="text-xl sm:text-2xl font-bold text-[#f66d76] font-[Dynapuff] mb-4 text-center px-4">No products found</div>
                <div className="text-base sm:text-lg text-[#7ead78] font-[Dynapuff] text-center px-4">Try a different search term or category</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;