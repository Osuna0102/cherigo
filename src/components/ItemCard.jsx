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
            <div className="bg-[#ffbdbf] p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full h-64 relative">
                <div></div>
                <div className="relative w-full h-full overflow-visible rounded-lg">
                    <img
                        src={urlFor(product.image[0])}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-125"
                    />
                    <div className="absolute top-0 right-0 flex flex-col items-end space-y-1">
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
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-[#f66d76] text-white px-4 py-2 rounded-lg text-2xl font-bold transform rotate-45">
                                Sold Out
                            </div>
                        </div>
                    )}

                    {/* Discount Triangle with Centered Text */}
                    {product.discount && (
                        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[120px] border-l-transparent border-b-[120px] border-b-[#f66d76] flex items-center justify-center transform translate-x-[16px] translate-y-[16px]">

                        </div>
                    )}

                    {/* Discount Triangle with Centered Text */}
                    {product.discount && (

                        <div className="bottom-0 right-0 absolute text-white text-lg font-bold transform -rotate-45 py-4">
                            {product.discount}% OFF!
                        </div>
                    )}


                </div>
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-[24px] font-bold font-fredoka text-[#f66d76] mb-2">{product.name}</h2>
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
