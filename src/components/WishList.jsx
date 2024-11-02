import React from 'react';

export default function WishList({ wishlist, addToCart, removeFromWishlist }) {
    return (
        <div>
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty</p>
            ) : (
                <div>
                    {wishlist.map((item) => {
                        const product = item.productId; 
                        if (!product || !product._id) return null;

                        return (
                            <div key={product._id} className="wishlist-item">
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <button onClick={() => addToCart(product)}>Move to Cart</button>
                                <button onClick={() => removeFromWishlist(product._id)}>Remove from Wishlist</button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
