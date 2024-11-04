import React from 'react';
import Slider from 'react-slick';
import './css/ProductCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductCarousel = ({ images, darkMode }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className={`product-carousel ${darkMode ? 'dark-mode' : 'light-mode'}`}>
            <Slider {...settings} style={{ width: '100%', minHeight: '400px' }}>
                {images.map((image, index) => (
                    <div key={index} className="product-card">
                        <a href={image.link} target="_blank" rel="noopener noreferrer">
                            <img src={image.src} alt={`Producto ${index + 1}`} className="product-image" />
                        </a>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductCarousel;
