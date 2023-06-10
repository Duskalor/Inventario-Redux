import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatos } from './features/Datos/datosSlice';
import { getpermisos } from './features/Permisos/permisosSlice';
import { getUsuarios } from './features/Usuarios/UsuariosSlice';
import Layout from './Layout';
import { getAlmacenes } from './features/Almacenes/almacenesSlice';
import { Box } from '@mui/material';

export default function Peticiones() {
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.Datos);
  useEffect(() => {
    dispatch(getAlmacenes());
    dispatch(getUsuarios());
    dispatch(getpermisos());
    dispatch(getDatos());
  }, []);

  return <Box>{success && <Layout />}</Box>;
}
