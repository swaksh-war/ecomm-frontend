import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList({ products }) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [nameFilter, setNameFilter] = useState('');

  const handlePriceFilterChange = (event) => {
    const { name, value } = event.target;
    setPriceRange((prevRange) => ({
      ...prevRange,
      [name]: value ? parseFloat(value) : (name === 'min' ? 0 : Infinity)
    }));
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product => 
    product.price >= priceRange.min &&
    product.price <= priceRange.max &&
    product.name.toLowerCase().includes(nameFilter)
  );

  return (
    <div>
      <div className="price-filter">
        <label>
          Min Price:
          <input 
            type="number" 
            name="min" 
            value={priceRange.min === 0 ? '' : priceRange.min}
            onChange={handlePriceFilterChange} 
            placeholder="0" 
          />
        </label>
        <label>
          Max Price:
          <input 
            type="number" 
            name="max" 
            value={priceRange.max === Infinity ? '' : priceRange.max}
            onChange={handlePriceFilterChange} 
            placeholder="No limit" 
          />
        </label>
      </div>

      
      <div className='plp'>
        {filteredProducts.map(product => (
          <div key={product.id} className='plp-card'>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <Link to={`/product/${product._id}`}> View Details </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
