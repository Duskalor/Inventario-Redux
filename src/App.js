import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import ListaCliente from './features/Clientes/ListaCliente';
import { getDatos } from './features/Datos/datosSlice';
import ListaProductos from './features/Pruductos/ListaProductos';
import Layout from './Layout';

function App() {
  const { RazonSocial } = useSelector((state) => state.Datos);
  const Dispatch = useDispatch();
  //console.log(RazonSocial);
  useEffect(() => {
    Dispatch(getDatos());
  }, []);

  return (
    <BrowserRouter>
      <div>
        <h1>Sistema De Inventario {RazonSocial}</h1>
        {/* <Link to={'/'}> HOME</Link>
        <Link to={'/cliente'}> Clientes</Link> */}

        <Routes>
          <Route path='/' element={<Layout />} />
          <Route path='/cliente' element={<ListaCliente />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
