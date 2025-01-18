import React, { useState, useEffect } from 'react';
import './css/Inventario.css';

const Inventario = ({ darkMode }) => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [categoriaActiva, setCategoriaActiva] = useState('relojes'); // Pestaña activa
    const [filtros, setFiltros] = useState({
        marca: '',
        malla: '',
        estilo: '',
        tipo: '', // Agregado para joyas
        material: '', // Agregado para joyas
        precio: 'asc',
    });

    useEffect(() => {
        fetch('https://docs.google.com/spreadsheets/d/1EIzoN40uaLzFxx13yT2ZX3XVBlNiiywOUdKtRBT-JjQ/gviz/tq?tqx=out:json')
            .then(response => response.text())
            .then(text => {
                const json = JSON.parse(text.substr(47).slice(0, -2)); // Ajusta para eliminar el encabezado no deseado
                const productos = json.table.rows.map(row => ({
                    id: row.c[0]?.v || '',
                    nombre: row.c[1]?.v || '',
                    precio: parseFloat(row.c[2]?.v || 0),
                    imagen: row.c[3]?.v || '',
                    categoria: row.c[4]?.v || '',
                    tipo: row.c[5]?.v || '',
                    estilo: row.c[6]?.v || '',
                    malla: row.c[7]?.v || '',
                    material: row.c[8]?.v || '',
                    marca: row.c[9]?.v || '',
                }));
                setProductos(productos);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const productosFiltrados = productos
            .filter(producto => producto.categoria === categoriaActiva)
            .filter(producto => !filtros.marca || producto.marca === filtros.marca)
            .filter(producto => !filtros.malla || producto.malla === filtros.malla)
            .filter(producto => !filtros.estilo || producto.estilo === filtros.estilo)
            .filter(producto => categoriaActiva === 'joyas' ? (!filtros.tipo || producto.tipo === filtros.tipo) : true)
            .filter(producto => categoriaActiva === 'joyas' ? (!filtros.material || producto.material === filtros.material) : true)
            .sort((a, b) => (filtros.precio === 'asc' ? a.precio - b.precio : b.precio - a.precio));
        setProductosFiltrados(productosFiltrados);
    }, [productos, categoriaActiva, filtros]);

    const cambiarCategoria = (categoria) => {
        setCategoriaActiva(categoria);
        setFiltros({
            marca: '',
            malla: '',
            estilo: '',
            tipo: '', // Resetea filtros de joyas
            material: '', // Resetea filtros de joyas
            precio: 'asc',
        });
    };

    return (
        <div className={`inventario ${darkMode ? 'dark' : 'light'}`}>
            {/* Botones de categoría */}
            <div className="category-buttons">
                <button
                    className={`category-button ${categoriaActiva === 'relojes' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`}
                    onClick={() => cambiarCategoria('relojes')}
                >
                    Relojes
                </button>
                <button
                    className={`category-button ${categoriaActiva === 'joyas' ? 'active' : ''} ${darkMode ? 'dark' : 'light'}`}
                    onClick={() => cambiarCategoria('joyas')}
                >
                    Joyas
                </button>
            </div>

            {/* Filtros dinámicos */}
            <div className="filtros">
                {categoriaActiva === 'relojes' && (
                    <>
                        <select onChange={(e) => setFiltros({ ...filtros, marca: e.target.value })}>
                            <option value="">Todas las marcas</option>
                            <option value="Rolex">Rolex</option>
                            <option value="Tudor">Tudor</option>
                            <option value="Omega">Omega</option>
                            <option value="Longines">Longines</option>
                            <option value="Casio">Casio</option>
                        </select>
                        <select onChange={(e) => setFiltros({ ...filtros, malla: e.target.value })}>
                            <option value="">Todas las mallas</option>
                            <option value="metal">Metal</option>
                            <option value="cuero">Cuero</option>
                            <option value="otro">Otro</option>
                        </select>
                        <select onChange={(e) => setFiltros({ ...filtros, estilo: e.target.value })}>
                            <option value="">Todos los estilos</option>
                            <option value="elegante">Elegante</option>
                            <option value="deportivo">Deportivo</option>
                        </select>
                    </>
                )}
                {categoriaActiva === 'joyas' && (
                    <>
                        <select onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}>
                            <option value="">Todos los tipos</option>
                            <option value="anillo">Anillo</option>
                            <option value="collar">Collar</option>
                            <option value="pulsera">Pulsera</option>
                            <option value="arete">Arete</option>
                        </select>
                        <select onChange={(e) => setFiltros({ ...filtros, material: e.target.value })}>
                            <option value="">Todos los materiales</option>
                            <option value="oro">Oro</option>
                            <option value="plata">Plata</option>
                            <option value="acero">Acero</option>
                        </select>
                        <select onChange={(e) => setFiltros({ ...filtros, estilo: e.target.value })}>
                            <option value="">Todos los estilos</option>
                            <option value="elegante">Elegante</option>
                            <option value="casual">Casual</option>
                        </select>
                    </>
                )}
                <select onChange={(e) => setFiltros({ ...filtros, precio: e.target.value })}>
                    <option value="asc">Precio: Menor a Mayor</option>
                    <option value="desc">Precio: Mayor a Menor</option>
                </select>
            </div>

            {/* Listado de productos */}
            <div className="productos-grid">
                {productosFiltrados.map(producto => (
                    <div key={producto.id} className="producto">
                        <img src={producto.imagen} alt={producto.nombre} />
                        <h3>{producto.marca || producto.tipo}</h3>
                        <p>{producto.nombre}</p>
                        <p>{producto.precio} USD</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventario;
