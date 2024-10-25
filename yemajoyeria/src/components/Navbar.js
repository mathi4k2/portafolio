import React from 'react';
import './css/Navbar.css';
import logo from '../imgs/logo.png';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    return (
        <nav className={`navbar ${darkMode ? 'dark' : 'light'}`}>
            <div className="logo">
                <img src={logo} alt="Yemajoyería Logo" className="logo-img" />
            </div>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Catálogo</a></li>
                <li><a href="#">Novedades</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
            <div className="toggle-container">
                <span className="toggle-label">{darkMode ? "Modo Oscuro" : "Modo Claro"}</span>
                <button className="toggle-switch" onClick={toggleDarkMode}>
                    <div className={`toggle-knob ${darkMode ? 'dark' : 'light'}`}></div>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
