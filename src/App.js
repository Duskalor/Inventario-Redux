import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ListaCliente from './features/Clientes/ListaCliente';
import { getDatos } from './features/Datos/datosSlice';
import { getpermisos } from './features/Permisos/permisosSlice';
import { getUsuarios } from './features/Usuarios/UsuariosSlice';
import Layout from './Layout';
import Login from './features/Auth/Login';

function App() {
  const Dispatch = useDispatch();
  const prueba = useSelector((state) => state.Auth);
  const { success } = prueba;
  useEffect(() => {
    Dispatch(getDatos());
    Dispatch(getpermisos());
    Dispatch(getUsuarios());
  }, [Dispatch]);

  return <div>{success ? <Layout /> : <Login />}</div>;
}

export default App;
