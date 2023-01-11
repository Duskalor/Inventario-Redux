import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getClientes } from './features/Clientes/clientesSlice';
import { getDatos } from './features/Datos/datosSlice';
import { getpermisos } from './features/Permisos/permisosSlice';
import { getDetalleEntradas } from './features/ProductoEntrada/productoEntradaSlice';
import { getProductos } from './features/Productos/productosSlice';
import { getDetalleSalida } from './features/ProductoSalidas/productosSalidaSlice';
import { getProveedor } from './features/Proveedor/ProveedorSlice';
import { getSalidas } from './features/Salidas/salidasSlice';
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
  Dispatch(getClientes());
  // Dispatch(getSalidas());
  // Dispatch(getProductos());
  // Dispatch(getDetalleEntradas());
  // Dispatch(getDetalleSalida());
}
