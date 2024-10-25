import React, { useState } from 'react';
import Navbar from './components/Navbar';
import IntroductionSection from './components/IntroductionSection';
import './App.css';
import ProductSection from './components/ProductSection';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <div className={`App ${darkMode ? 'dark' : 'light'}`}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <IntroductionSection darkMode={darkMode} />
            <ProductSection darkMode={darkMode} />
            {/* Otros componentes de productos que vendrán después */}
        </div>
    );
}

export default App;
