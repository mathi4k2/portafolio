import React, { useState } from 'react';
import './css/ProductSection.css';
import ProductCarousel from './ProductCarousel';

const ProductSection = ({ darkMode }) => {
    const [selectedCategory, setSelectedCategory] = useState('Relojes');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    return (
        <section className="product-section">
            <div className="category-buttons">
                <button 
                    className={`category-button ${selectedCategory === 'Relojes' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`} 
                    onClick={() => handleCategoryChange('Relojes')}
                >
                    Relojes
                </button>
                <button 
                    className={`category-button ${selectedCategory === 'Joyas' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`} 
                    onClick={() => handleCategoryChange('Joyas')}
                >
                    Joyas
                </button>
            </div>
            <div className="product-display">
                {/* Pasamos selectedCategory en lugar de "Relojes" */}
                <ProductCarousel category={selectedCategory} darkMode={darkMode} />
            </div>
        </section>
    );
};

export default ProductSection;
