import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Cart({ cart, removeFromCart, incrementQuantity, decrementQuantity, moveToWishlist }) {
    const [products, setProducts] = useState({}); 
    useEffect(() => {
        const fetchProductDetails = async () => {
            const productDetails = {};
            for (const item of cart) {
                const { productId } = item;
                if (!products[productId]) {
                    try {
                        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                        productDetails[productId] = response.data;
                    } catch (error) {
                        console.error(`Error fetching product ${productId}:`, error);
                    }
                }
            }
            setProducts(prevProducts => ({ ...prevProducts, ...productDetails }));
        };

        fetchProductDetails();
    }, [cart]);

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => {
        const product = products[item.productId];
        return product ? total + product.price * item.quantity : total;
    }, 0);

    return (
        <div className="cart-main">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your Cart is Empty</p>
            ) : (
                <div>
                    {cart.map((item) => {
                        const product = products[item.productId];
                        if (!product) return null; // Avoid rendering until product details are available

                        return (
                            <div key={item.productId} className="cart-item">
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>Price: ${product.price}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => decrementQuantity(item.productId)}>-</button>
                                    <p>Quantity: {item.quantity}</p>
                                    <button onClick={() => incrementQuantity(item.productId)}>+</button>
                                </div>
                                <p>Total: ${(product.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                                <button onClick={() => moveToWishlist(product)}>Move to Wishlist</button>
                            </div>
                        );
                    })}
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
}

