import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart'; 
import WishList from './components/WishList'; 
import NavBar from './components/NavBar';
import './App.css';

function App() {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products, cart, and wishlist
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
            }
        };

        const fetchCartAndWishlist = async () => {
            try {
                const cartResponse = await axios.get('http://localhost:5000/api/cart');
                setCart(cartResponse.data.items || []);

                const wishlistResponse = await axios.get('http://localhost:5000/api/wishlist');
                setWishlist(wishlistResponse.data.items || []);
            } catch (error) {
                console.error('Error fetching cart or wishlist:', error);
            }
        };

        fetchProducts();
        fetchCartAndWishlist();
    }, []);

    const addToCart = (product) => {
        axios.post('http://localhost:5000/api/cart', {
            productId: product._id,
            quantity: 1
        })
        .then(response => {
            setCart(response.data.items);
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
        });
    };

    const addToWishlist = (product) => {
        axios.post('http://localhost:5000/api/wishlist', {
            productId: product._id
        })
        .then(response => {
            setWishlist(response.data.items);
        })
        .catch(error => {
            console.error('Error adding to wishlist:', error);
        });
    };

    const removeFromCart = (productId) => {
        axios.delete(`http://localhost:5000/api/cart/${productId}`)
        .then(response => {
            setCart(response.data.items);
        })
        .catch(error => {
            console.error('Error removing from cart:', error);
        });
    };

    const removeFromWishlist = (productId) => {
        axios.delete(`http://localhost:5000/api/wishlist/${productId}`)
        .then(response => {
            setWishlist(response.data.items);
        })
        .catch(error => {
            console.error('Error removing from wishlist:', error);
        });
    };

    const incrementQuantity = (productId) => {
        axios.post("http://localhost:5000/api/cart", {
            productId: productId,
            quantity: 1
        })
        .then(response => {
            setCart(response.data.items);
        })
        .catch(error => {
            console.error('Error updating cart quantity:', error);
        });
    };

    const decrementQuantity = (productId) => {
        const currentItem = cart.find(item => item.productId === productId);
        if (currentItem && currentItem.quantity > 1) {
            axios.post('http://localhost:5000/api/cart', {
                productId: productId,
                quantity: -1
            })
            .then(response => {
                setCart(response.data.items);
            })
            .catch(error => {
                console.error('Error updating cart quantity:', error);
            });
        }
    };

    const moveToWishlist = (product) => {
        removeFromCart(product._id);
        addToWishlist(product);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(term.toLowerCase()) ||
                product.description.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    return (
        <Router>
            <NavBar searchTerm={searchTerm} handleSearch={handleSearch} />
            <Routes>
                <Route 
                    path="/" 
                    element={<ProductList 
                        products={filteredProducts} 
                        addToCart={addToCart} 
                        addToWishlist={addToWishlist} 
                    />} 
                />
                <Route 
                    path="/product/:id" 
                    element={<ProductDetails 
                        products={products} 
                        addToCart={addToCart} 
                        addToWishlist={addToWishlist} 
                    />} 
                />
                <Route 
                    path="/cart" 
                    element={<Cart 
                        cart={cart} 
                        removeFromCart={removeFromCart} 
                        incrementQuantity={incrementQuantity} 
                        decrementQuantity={decrementQuantity} 
                        moveToWishlist={moveToWishlist} 
                    />} 
                />
                <Route 
                    path="/wishlist" 
                    element={<WishList 
                        wishlist={wishlist} 
                        addToCart={addToCart} 
                        removeFromWishlist={removeFromWishlist} 
                    />} 
                /> 
            </Routes>
        </Router>
    );
}

export default App;
