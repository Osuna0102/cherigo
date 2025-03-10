import React from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { urlFor, client } from '../lib/client';

const ProductDetail = () => {
    const { slug } = useParams();
    const { addToCart } = useOutletContext();
    const [product, setProduct] = React.useState(null);

    React.useEffect(() => {
        const fetchProduct = async () => {
            const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
            const productData = await client.fetch(query);
            setProduct(productData);
        };

        fetchProduct();
    }, [slug]);

    if (!product) return <div>Loading...</div>;

    const discountedPrice = product.discount ? product.price - (product.price * product.discount / 100) : product.price;

    return (
        <div className="p-4 bg-[#fff6e1] width-full">
            <div className="max-w-2xl mx-auto bg-[#ffbdbf] p-4 rounded-lg shadow-lg">
                <img src={urlFor(product.image[0])} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
                <h1 className="text-4xl font-bold mt-4">{product.name}</h1>
                <p className="mt-2">{product.details}</p>
                <div className="mt-4">
                    {product.discount && (
                        <div className="text-red-500 line-through">${product.price.toFixed(2)}</div>
                    )}
                    <div className="text-2xl font-bold">${discountedPrice.toFixed(2)}</div>
                </div>
                <button
                    onClick={() => addToCart(product)}
                    className="mt-4 px-4 py-2 bg-[#f66d76] text-white rounded-lg hover:bg-[#eb8194] transition-colors duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;