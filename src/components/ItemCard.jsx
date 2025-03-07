import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <div className="bg-[#ffbdbf] p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="relative w-full h-48 overflow-visible rounded-lg">
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-125" 
                    />
                    <div className="absolute top-0 right-0 bg-[#f66d76] text-white px-2 py-1 rounded-bl-lg transform rotate-45 translate-x-1/2 -translate-y-1/2">
                        ${product.price}
                    </div>
                </div>
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-[24px] font-bold font-fredoka text-[#f66d76] font-semibold mb-2">{product.title}</h2>
                {/* <p className="text-gray-700 mb-2">{product.description}</p> */}
                <div className="flex justify-center space-x-2">
                    {product.categories.map((category, index) => (
                        <span
                            key={index}
                            className="ml-2 px-2 py-1 text-sm font-bold font-fredoka rounded-full hover:bg-[#eb8194] hover:text-white transition-colors duration-300 bg-[#c0d763] text-[#fff6e1]"
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ItemCard;