import React, { useState } from 'react';
import './css/ProductCarousel.css';

const ProductCarousel = ({ category, darkMode }) => {
    const products = {
        Relojes: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            image: `url_del_reloj_${i + 1}.jpg`,
            brand: `Marca ${i + 1}`,
            model: `Modelo ${i + 1}`,
            details: `Detalles del reloj ${i + 1}`,
            contactLink: 'https://contacto.com',
        })),
        Joyas: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            image: `url_de_la_joya_${i + 1}.jpg`,
            brand: `Marca Joya ${i + 1}`,
            model: `Modelo Joya ${i + 1}`,
            details: `Detalles de la joya ${i + 1}`,
            contactLink: 'https://contacto.com',
        }))
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const totalProducts = products[category].length;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalProducts);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + totalProducts) % totalProducts
        );
    };

    const getClassForPosition = (index) => {
        const relativeIndex = (index - currentIndex + totalProducts) % totalProducts;
        if (relativeIndex === 0) return 'center-product';
        if (relativeIndex === 1 || relativeIndex === totalProducts - 1) return 'side-product';
        if (relativeIndex === 2 || relativeIndex === totalProducts - 2) return 'far-side-product';
        return 'hidden';
    };

    return (
        <div className={`product-carousel ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <button className="arrow arrow-left" onClick={handlePrev}>◀</button>
            <div className="carousel-track">
                <div className="carousel-inner">
                    {products[category].map((product, index) => (
                        <div key={product.id} className={`product-card ${getClassForPosition(index)}`}>
                            <img src={product.image} alt={product.model} className="product-image" />
                            <div className="product-info">
                                <h3>{product.brand}</h3>
                                <p><strong>Modelo:</strong> {product.model}</p>
                                <p><strong>Detalles:</strong> {product.details}</p>
                                <a href={product.contactLink} target="_blank" rel="noopener noreferrer" className="contact-link">
                                    Consultar precio
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="arrow arrow-right" onClick={handleNext}>▶</button>
        </div>
    );
};

export default ProductCarousel;
