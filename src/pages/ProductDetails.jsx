import React, { useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { urlFor, client } from '../lib/client';

const ProductDetail = () => {
    const { slug } = useParams();
    const { addToCart } = useOutletContext();
    const [product, setProduct] = React.useState(null);
    const [index, setIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => {
        setQuantity((prevQty) => prevQty + 1);
    }

    const decreaseQty = () => {
        setQuantity((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    React.useEffect(() => {
        const fetchProduct = async () => {
            const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
            const productData = await client.fetch(query);
            setProduct(productData);
        };

        fetchProduct();
    }, [slug]);

    if (!product) return <div className='justify-items-center'>
        <div role="status">
            <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
            <span className="sr-only">Loading...</span>
        </div>
        Loading...
    </div>;

    const discountedPrice = product.discount ? product.price - (product.price * product.discount / 100) : product.price;

    return (
        <div className="p-4 bg-[#fff6e1]  w-full " style={{ backgroundImage: "url('/assets/bgdecor.png')", backgroundSize: 'cover'}}>
        
        {/* Top Column */}
        <div className="flex flex-row">
        
        {/* Left Column - Back Button */}
       <div className="w-1/12 flex items-start p-4">
        <button
            onClick={() => window.history.back()}
            className=" bg-[#ecc236] text-white rounded-full hover:bg-[#eb8194] transition-colors duration-300"
        >
            <img src='/assets/back.png' alt='back' className='h-8 '/>
        </button>
        </div>

        {/* Center Column - Product Image */}
        <div className="w-5/12 max-w-2xl m-10 justify-items-center">
            <div className=" p-0 w-80 h-80  bg-[#ffbdbf]  rounded-lg shadow-lg">
            <img src={urlFor(product.image && product.image[index])} alt={product.name} className="object-cover rounded-lg" />
            </div>
            <div className='flex flex-row p-2'>
                {product.image?.map((item, i) => (
                    <img key={i} src={urlFor(item)} className={`w-16 h-16 p-2 object-cover rounded-lg cursor-pointer transition-all duration-200 ${i === index ? 'ring-2 ring-red-300' : 'opacity-50'}`} onMouseEnter={() => setIndex(i)}/>
                ))}
            </div>
            <div className="mt-4  justify-items-center">
                {product.discount && (
                <div className="text-red-500 line-through font-[Dynapuff]">USD ${product.price.toFixed(2)}</div>
                )}
                <div className="text-2xl font-bold font-[Dynapuff] ">USD ${discountedPrice.toFixed(2)}</div>
                <div className="text-l font-[Dynapuff] ">per piece</div>
            </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="w-6/12 p-4">
            <h1 className="text-3xl font-bold mt-4 font-[Dynapuff] text-red-400 justify-self-center">{product.name}</h1>
    
            <div className="justify-items-center" style={{ backgroundImage: "url('/assets/greenboard.png')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <h2 className='font-bold font-[Dynapuff]'>Select your fav:</h2>
                    {!selectedChoice ? (
                        product.choices?.map((choice, i) => (
                            <button key={i} onClick={() => { setSelectedChoice(choice); setQuantity(1); }}
                                className="m-2 px-6 py-2 bg-red-300 text-white font-bold font-[Dynapuff] rounded-lg hover:bg-[#eb8194] transition-colors duration-300">
                                {choice}
                            </button>
                        ))
                    ) : (
                        <div className="flex flex-col items-center">
                            <h2 className="text-2xl font-bold font-[Dynapuff]">{selectedChoice}</h2>

                            <div className="flex items-center space-x-4 mt-4">
                                <button onClick={decreaseQty}>
                                    <img src='/assets/minus.png' className='h-6' />
                                </button>
                                <p className='text-white font-bold font-[Dynapuff] text-2xl'>{quantity}</p>
                                <button onClick={increaseQty}>
                                    <img src='/assets/plus.png' className='h-6' />
                                </button>
                            </div>

                            <button onClick={() => { addToCart({ product, choice: selectedChoice, quantity }); setSelectedChoice(null); }}
                                className="mt-4 px-4 py-2 bg-[#f66d76] text-white rounded-lg hover:bg-[#eb8194] transition-colors duration-300">
                                Add to Cart
                            </button>

                            <button onClick={() => setSelectedChoice(null)} className="mt-2 text-gray-600 underline">Cancel</button>
                        </div>
                    )}
                </div>
        </div>
        </div>

        {/* Bottom Column -  Description */}
        <div className='flex flex-row'>
            <hr />
            <p className="mt-2">{product.details}</p>
            <button onClick={() => localStorage.clear()} className="mt-2 text-gray-600 underline">
                Empty Cart
            </button>
        </div>
               


        </div>

    );
};

export default ProductDetail;