import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getDatosReports } from './reportSlice';
import SyncIcon from '@mui/icons-material/Sync';
import { getProductos } from '../Productos/productosSlice';
import { getEntradas } from '../Entrada/entradaSlice';
import { getSalidas } from '../Salidas/salidasSlice';
export default function GenerarReporte() {
  const { DatosReports } = useSelector((state) => state.Report);
  const { productos } = useSelector((state) => state.Productos);
  const { entradas } = useSelector((state) => state.Entrada);
  const { salidas } = useSelector((state) => state.Salida);

  const dispatch = useDispatch();
  console.log(DatosReports);
  useEffect(() => {
    dispatch(getDatosReports());
    if (productos.length === 0) {
      dispatch(getProductos());
    }
    if (entradas.length === 0) {
      dispatch(getEntradas());
    }
    if (salidas.length === 0) {
      dispatch(getSalidas());
    }
  }, [dispatch]);

  return <>{DatosReports ? <h1>GenerarReporte</h1> : <SyncIcon />}</>;
}
