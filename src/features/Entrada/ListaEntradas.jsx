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
import { createProductoEntrada } from '../ProductoEntrada/productoEntradaSlice';
import Entradas from './Entradas';
import { getEntradas } from './entradaSlice';

export default function ListaEntradas() {
  const { entradas } = useSelector((state) => state.Entrada);
  const { id: IdEntrada } = useSelector((state) => state.Entrada);
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEntradas());
    if (!IdEntrada == '') {
      productoEntrada.map((pe) => {
        dispatch(createProductoEntrada({ IdEntrada, pe }));
      });
    }
  }, [dispatch, IdEntrada]);

  return (
    <div>
      <h1>ENTRADAS</h1>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Codigo Documento</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Cantidad de Productos</TableCell>
              <TableCell>Monto Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entradas.map((entrada, id) => (
              <Entradas key={id} entradas={entrada} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
