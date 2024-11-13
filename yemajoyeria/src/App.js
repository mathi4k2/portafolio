import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'; // Para animaciones
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

    // Hook para obtener la ubicación actual
    const location = useLocation();

    return (
        <div className={`App ${darkMode ? 'dark' : 'light'}`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <IntroductionSection darkMode={darkMode} />
                                <ProductSection darkMode={darkMode} />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/inventario"
                        element={
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Inventario darkMode={darkMode} />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </div>
    );
}

export default App;
