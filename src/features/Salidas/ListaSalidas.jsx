import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProductoSalida,
  getDetalleSalida,
} from '../ProductoSalidas/productosSalidaSlice';
import Salidas from './Salidas';
import { getSalidas } from './salidasSlice';
import { getProductos } from '../Productos/productosSlice';
import { centrar } from '../style';

// import Entradas from './Entradas';
// import { getEntradas } from './entradaSlice';

export default function ListaSalidas() {
  const { salidas } = useSelector((state) => state.Salida);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSalidas());
    dispatch(getProductos());
    dispatch(getDetalleSalida());
    return () => {};
  }, [dispatch]);

  return (
    <div>
      <h1>SALIDAS</h1>
      <TableContainer component={Paper} style={{ maxHeight: 550 }}>
        <Table stickyHeader arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell sx={centrar}>Codigo Documento</TableCell>
              <TableCell sx={centrar}>Vendedor</TableCell>
              <TableCell sx={centrar}>Cliente</TableCell>
              <TableCell sx={centrar}>Dni</TableCell>
              <TableCell sx={centrar}>Cantidad de Productos</TableCell>
              <TableCell sx={centrar}>Monto Total</TableCell>
              <TableCell sx={centrar}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salidas.length == 0 ? (
              <TableRow>
                <TableCell sx={centrar}>Cargando</TableCell>
              </TableRow>
            ) : (
              salidas.map((salida, id) => <Salidas key={id} salida={salida} />)
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
