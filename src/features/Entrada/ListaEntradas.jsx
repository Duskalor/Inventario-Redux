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
import Entradas from './Entradas';
import { getEntradas } from './entradaSlice';

export default function ListaEntradas() {
  const { entradas } = useSelector((state) => state.Entrada);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEntradas());
    dispatch(getProductos());
    dispatch(getDetalleEntradas());
    return () => {};
  }, []);

  return (
    <div>
      <h1>ENTRADAS</h1>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>
                Codigo Documento
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Usuario</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Proveedor</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                Cantidad de Productos
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Monto Total</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entradas.length == 0 ? (
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>Cargando</TableCell>
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
