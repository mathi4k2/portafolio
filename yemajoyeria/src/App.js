import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import IntroductionSection from './components/IntroductionSection';
import ProductSection from './components/ProductSection';
import Inventario from './components/Inventario';
import './App.css';

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    return (
        <Router>
            <div className={`App ${darkMode ? 'dark' : 'light'}`}>
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <IntroductionSection darkMode={darkMode} />
                                <ProductSection darkMode={darkMode} />
                            </>
                        }
                    />
                    <Route path="/inventario" element={<Inventario darkMode={darkMode} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;