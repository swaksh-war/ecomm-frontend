import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products, addToCart, addToWishlist }) => {
    const { id } = useParams();
    const product = products.find(p => p._id === id);

    if (!product) return <h2>Product Not Found!</h2>;

    return (
        <div className='pdp'>
            <img src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
        </div>
    );
};

export default ProductDetails;
