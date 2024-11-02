import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar({ searchTerm, handleSearch }) {
  return (
    <nav className="navbar">
        <ul className="nev-left">
            <li className="brand-name">Electronic-Commerce</li>
        </ul>
      <ul>
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/cart'>Cart</Link></li>
        <li><Link to='/wishlist'>Wishlist</Link></li>
      </ul>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchTerm}
        onChange={e => handleSearch(e.target.value)}
        className="search-bar"
      />
    </nav>
  );
}
