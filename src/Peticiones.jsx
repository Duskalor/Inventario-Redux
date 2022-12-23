import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDatos } from './features/Datos/datosSlice';
import { getpermisos } from './features/Permisos/permisosSlice';
import { getDetalleEntradas } from './features/ProductoEntrada/productoEntradaSlice';
import { getProductos } from './features/Productos/productosSlice';
import { getProveedor } from './features/Proveedor/ProveedorSlice';
import { getUsuarios } from './features/Usuarios/UsuariosSlice';
import Layout from './Layout';

export default function Peticiones() {
  const Dispatch = useDispatch();
  useEffect(() => {
    Peticions(Dispatch);
  }, [Dispatch]);

  return <Layout />;
}

export function Peticions(Dispatch) {
  Dispatch(getDatos());
  Dispatch(getUsuarios());
  Dispatch(getpermisos());
  Dispatch(getProveedor());
  Dispatch(getProductos());
  Dispatch(getDetalleEntradas());
}
