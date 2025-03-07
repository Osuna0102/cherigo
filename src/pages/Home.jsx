import React, { useEffect, useState } from 'react';

const hardcodedProducts = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description for product 1',
    price: '10.00',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description for product 2',
    price: '20.00',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    title: 'Product 3',
    description: 'Description for product 3',
    price: '30.00',
    image: 'https://via.placeholder.com/150'
  }
];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(hardcodedProducts);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-bold mb-4">${product.price}</p>
            <button
              className="snipcart-add-item bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              data-item-id={product.id}
              data-item-name={product.title}
              data-item-price={product.price}
              data-item-url="/"
              data-item-description={product.description}
              data-item-image={product.image}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;