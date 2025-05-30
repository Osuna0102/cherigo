import React from 'react';
import { useNavigate } from 'react-router-dom';
import { urlFor } from '../lib/client';

const ItemCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.slug.current}`);
    };

    const discountedPrice = product.discount ? product.price - (product.price * product.discount / 100) : product.price;
    const isSoldOut = product.inventory === undefined || product.inventory <= 0;

    return (
        <div onClick={handleClick} className="cursor-pointer relative">
    <div className="bg-[#ffbdbf] p-2 sm:p-4 md:p-6 m-1 sm:m-2 md:m-3 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full relative">
    <div className="relative w-full aspect-square overflow-visible rounded-lg">
                    <img
                        src={urlFor(product.image[0])}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute top-0 right-0 flex flex-col items-end space-y-1 z-10">
                        {product.discount && (
                            <div className="bg-[#f66d76] text-white px-2 py-1 rounded-bl-lg transform rotate-45 translate-x-1/2 -translate-y-1/2 line-through">
                                ${product.price.toFixed(2)}
                            </div>
                        )}
                        <div className="bg-[#f66d76] text-white px-2 py-1 rounded-bl-lg transform rotate-45 translate-x-1/2 -translate-y-1/2">
                            ${discountedPrice.toFixed(2)}
                        </div>
                    </div>

                    {isSoldOut && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                            <div className="bg-[#f66d76] text-white px-4 py-2 rounded-lg text-2xl font-bold transform rotate-45">
                                Sold Out
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Discount corner positioned on the outside of the card */}
                {product.discount && (
                    <div className="absolute bottom-0 right-0 overflow-hidden w-[100px] h-[100px]">
                        {/* Triangle background */}
                        <div className="absolute top-0 left-0 w-0 h-0 
                            border-t-[100px] border-t-transparent 
                            border-r-[100px] border-r-[#f66d76]">
                        </div>
                        
                        {/* Text overlay */}
                        <div className="absolute top-0 right-0 h-full w-full flex items-center justify-center">
                            <div className="text-white font-bold transform -rotate-45 translate-y-[10px] translate-x-[10px]">
                                {product.discount}% OFF!
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-[24px] font-bold font-fredoka text-[#f66d76] mb-2">{product.name}</h2>
                <div className="flex justify-center flex-wrap gap-2">
                    {product.categories.map((category, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-sm font-bold font-fredoka rounded-full hover:bg-[#eb8194] hover:text-white transition-colors duration-300 bg-[#c0d763] text-[#fff6e1]"
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