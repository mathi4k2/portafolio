// Inventario.js
import React, { useState, useEffect } from 'react';
import './css/Inventario.css'; // Importa el archivo CSS

const Inventario = ({ darkMode }) => {
  const [productos, setProductos] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');
  const [ordenPrecio, setOrdenPrecio] = useState('asc');
  const [filtroMalla, setFiltroMalla] = useState('');
  const [filtroEstilo, setFiltroEstilo] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    // Carga el JSON de productos
    fetch('/productos.json')
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        setProductosFiltrados(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    let productosActualizados = [...productos];

    if (filtroMarca) {
      productosActualizados = productosActualizados.filter(producto => producto.marca === filtroMarca);
    }
    if (filtroMalla) {
      productosActualizados = productosActualizados.filter(producto => producto.malla === filtroMalla);
    }
    if (filtroEstilo) {
      productosActualizados = productosActualizados.filter(producto => producto.estilo === filtroEstilo);
    }
    if (ordenPrecio === 'asc') {
      productosActualizados.sort((a, b) => a.precio - b.precio);
    } else {
      productosActualizados.sort((a, b) => b.precio - a.precio);
    }

    setProductosFiltrados(productosActualizados);
  }, [filtroMarca, ordenPrecio, filtroMalla, filtroEstilo, productos]);

  return (
    <div className={`inventario ${darkMode ? 'dark' : 'light'}`}>
      <div className="filtros">
        <select onChange={(e) => setFiltroMarca(e.target.value)}>
          <option value="">Marca</option>
          <option value="Rolex">Rolex</option>
          <option value="Tudor">Tudor</option>
          <option value="Omega">Omega</option>
          <option value="Longines">Longines</option>
          <option value="Casio">Casio</option>
        </select>

        <select onChange={(e) => setFiltroMalla(e.target.value)}>
          <option value="">Malla</option>
          <option value="metal">Metal</option>
          <option value="cuero">Cuero</option>
          <option value="otro">Otro</option>
        </select>

        <select onChange={(e) => setFiltroEstilo(e.target.value)}>
          <option value="">Estilo</option>
          <option value="elegante">Elegante</option>
          <option value="deportivo">Deportivo</option>
        </select>

        <select onChange={(e) => setOrdenPrecio(e.target.value)}>
          <option value="asc">Precio: Menor a Mayor</option>
          <option value="desc">Precio: Mayor a Menor</option>
        </select>
      </div>

      <div className="productos-grid">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="producto">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.marca}</h3>
            <p>{producto.nombre}</p>
            <p>{producto.precio} €</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventario;
