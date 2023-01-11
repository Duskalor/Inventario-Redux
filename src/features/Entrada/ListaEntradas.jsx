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
import { getDetalleEntradas } from '../ProductoEntrada/productoEntradaSlice';
import { getProductos } from '../Productos/productosSlice';
import { centrar } from '../style';
import Entradas from './Entradas';
import { getEntradas } from './entradaSlice';

export default function ListaEntradas() {
  const { entradas } = useSelector((state) => state.Entrada);
  const { productos } = useSelector((state) => state.Productos);

  const dispatch = useDispatch();
  useEffect(() => {
    if (entradas.length === 0) dispatch(getEntradas());
    if (productos.length === 0) dispatch(getProductos());
    dispatch(getDetalleEntradas());

    return () => {};
  }, [dispatch]);

  return (
    <div>
      <h1>ENTRADAS</h1>
      <TableContainer component={Paper} style={{ maxHeight: 550 }}>
        <Table stickyHeader arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell sx={centrar}>Codigo Documento</TableCell>
              <TableCell sx={centrar}>Usuario</TableCell>
              <TableCell sx={centrar}>Proveedor</TableCell>
              <TableCell sx={centrar}>Cantidad de Productos</TableCell>
              <TableCell sx={centrar}>Monto Total</TableCell>
              <TableCell sx={centrar}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entradas.length == 0 ? (
              <TableRow>
                <TableCell sx={centrar}>Cargando</TableCell>
              </TableRow>
            ) : (
              entradas.map((entrada, id) => (
                <Entradas key={id} entradas={entrada} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
