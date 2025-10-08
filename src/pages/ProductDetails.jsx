import React, { useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { urlFor, client } from '../lib/client';
import { FaShoppingCart } from 'react-icons/fa';
import { PortableText } from '@portabletext/react';
import { useLanguage } from '../lib/languageContext';

const ProductDetail = () => {
    const { slug } = useParams();
    const { addToCart } = useOutletContext();
    const [product, setProduct] = React.useState(null);
    const [index, setIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const {language} = useLanguage();

    const increaseQty = () => {
        setQuantity((prevQty) => prevQty + 1);
    }

    const decreaseQty = () => {
        setQuantity((prevQty) => {
            if (prevQty - 1 < 1) return 1;
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
            <svg aria-hidden="true" className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
            <span className="sr-only">Loading...</span>
        </div>
        Loading...
    </div>;

    const discountedPrice = product.discount ? product.price - (product.price * product.discount / 100) : product.price;

    const components = {
        block: {
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-[#D4AF37] mb-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold text-[#bfa88f] mb-5">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl mb-4">{children}</h3>
          ),
          normal: ({ children }) => (
            <p className="text-lg leading-relaxed mb-5 font-light">{children}</p>
          ),
        },
        marks: {
          strong: ({ children }) => (
            <strong className="font-bold text-gray-800">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700">{children}</em>
          ),
          link: ({ value, children }) => (
            <a
              href={value.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4AF37] underline hover:text-[#bfa88f]"
            >
              {children}
            </a>
          ),
        },
      };

    return (
        <div className=" p-4 bg-[#fff6e1] w-full flex justify-center" style={{ backgroundImage: "url('/assets/bgdecor.png')", backgroundSize: 'cover' }}>
            <div className="my-4 ml-4">
                <button
                    onClick={() => window.history.back()}
                    className="bg-[#ecc236] text-white rounded-full hover:bg-[#eb8194] transition-colors duration-300"
                    >
                    <img src='/assets/back.png' alt='back' className='h-8' />
                </button>
            </div> 
            
            <div className="flex flex-col max-w-[1400px] w-full px-4 md:px-8 gap-6 mx-auto my-10">

                {/* Top Section - 2-column layout */}
                <div className="flex flex-col md:flex-row gap-8 w-full">
                    {/* Left Column - Product Image */}
                    <div className="w-full md:w-6/12 p-4">
                        
                    
                        <div className="mx-auto bg-[#ffbdbf] rounded-lg shadow-lg overflow-hidden 
                                        w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                            <img src={urlFor(product.image && product.image[index])} alt={product.name[language]} className="object-cover rounded-lg" />
                        </div>
                        <div className='flex flex-row flex-wrap justify-center gap-2 mt-4'>
                            {product.image?.map((item, i) => (
                                <img key={i} src={urlFor(item)} className={`w-16 h-16 p-2 object-cover rounded-lg cursor-pointer transition-all duration-200 ${i === index ? 'ring-2 ring-red-300' : 'opacity-50'}`} onMouseEnter={() => setIndex(i)} />
                            ))}
                        </div>
                        <div className="mt-4 text-center">
                            {product.discount && (
                                <div className="text-red-500 line-through font-[Dynapuff]">USD ${product.price.toFixed(2)}</div>
                            )}
                            <div className="text-2xl font-bold font-[Dynapuff]">USD ${discountedPrice.toFixed(2)}</div>
                            <div className="text-l font-[Dynapuff]"> {language === 'ja' ? '一個につ' : 'per piece'}</div>
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="w-full md:w-6/12 p-4">
                        <h1 className="text-3xl font-bold mt-4 font-[Dynapuff] text-red-400 justify-self-center">{product.name[language]}</h1>
                
                        <div className=" justify-items-center w-full max-w-md mx-auto "
                            style={{
                                backgroundImage: "url('/assets/greenboard.png')",
                                backgroundSize: 'contain', backgroundPosition: 'top', backgroundRepeat: 'no-repeat',
                                backgroundColor: '#fff6e1', minHeight: '400px', aspectRatio: '1 / 1'
                            }}>
                
                            <div className='pt-2 lg:pb-16'></div>
                            <h2 className='font-bold font-[Dynapuff] text-center '>{language === 'ja' ? 'お気に入りを選択' : 'Selection:'} </h2>
                
                            {!selectedChoice ? (
                                <div className="flex flex-wrap justify-center md:mt-4">
                                    {product.choices?.map((choice, i) => (
                                        <button key={i} onClick={() => { setSelectedChoice(choice[language]); setQuantity(1); }}
                                            className={`m-2 px-6 py-2 bg-red-300 text-white font-bold font-[Dynapuff] rounded-full hover:bg-[#eb8194] transition-colors duration-300 ${
                                                product.choices.length <= 2 ? 'min-w-[120px]' : 
                                                product.choices.length <= 4 ? 'min-w-[100px]' : 'min-w-[90px]'
                                            }`}>
                                            {choice[language]}
                                        </button>
                                    ))}
                                </div>
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
                                        className="flex gap-2 mt-4 px-4 py-2 bg-white font-[Dynapuff] text-[#f66d76] font-bold rounded-full hover:bg-[#f66d76] hover:text-white transition-colors duration-300">
                                        <FaShoppingCart className="text-xl" /><span className='uppercase'>{language === 'ja' ? 'カートに追加' : 'Add to Cart'}</span>
                                    </button>
                
                                    <button onClick={() => setSelectedChoice(null)} className="mt-2 font-[Dynapuff] text-white underline">{language === 'ja' ?　'消す' : 'Cancel'}</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
        
                {/* Bottom Section - Description (with consistent alignment) */}
                <div className="px-8">
                    <div className="border-t-2 border-[#ffbd59] my-4"></div>
                    <div className='uppercase text-3xl font-[Dynapuff] text-[#7ead78] font-bold'>Description</div>
                    <div className='font-[Dynapuff] text-red-400 font-bold uppercase'>{language === 'ja' ? '商品：' : 'Product:'} {product.name[language]}</div>
                    <div className="border-t-2 border-[#ffbd59] my-4"></div>
                    <div className='prose max-w-none font-[Dynapuff] text-red-400 mb-8'>
                        <PortableText value={product.details[language]} components={components} />
                    </div>
                </div>
            </div>            
        </div>

    );
};

export default ProductDetail;