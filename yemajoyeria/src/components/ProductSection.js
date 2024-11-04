import React, { useState } from 'react';
import './css/ProductSection.css';
import ProductCarousel from './ProductCarousel';

// Importa las imágenes de relojes y joyas
import reloj1 from './carrusel/reloj1.png';
import reloj2 from './carrusel/reloj2.png';
import reloj3 from './carrusel/reloj3.png';
import joya1 from './carrusel/joya1.png';
import joya2 from './carrusel/joya2.png';
import joya3 from './carrusel/joya3.png';

const ProductSection = ({ darkMode }) => {
    const [selectedCategory, setSelectedCategory] = useState('Relojes');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Define las imágenes de cada categoría usando las importaciones
    const images = {
        Relojes: [
            { src: reloj1, link: 'https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20el%20reloj%201' },
            { src: reloj2, link: 'https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20el%20reloj%202' },
            { src: reloj3, link: 'https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20el%20reloj%203' },
        ],
        Joyas: [
            { src: joya1, link: 'https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20la%20joya%201' },
            { src: joya2, link: 'https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20la%20joya%202' },
            { src: joya3, link: 'https://wa.me/1234567890?text=Hola,%20estoy%20interesado%20en%20la%20joya%203' },
        ],
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
                <ProductCarousel images={images[selectedCategory]} darkMode={darkMode} />
            </div>
        </section>
    );
};

export default ProductSection;
