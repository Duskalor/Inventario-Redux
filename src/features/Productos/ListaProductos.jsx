import Productos from './Productos';
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
import { getProductos } from './productosSlice';

export default function ListaProductos() {
  const { productos } = useSelector((state) => state.Productos);
  //console.log(clientes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductos());
  }, []);

  return (
    <div>
      <h1>PRODUCTOS</h1>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Precio Compra </TableCell>
              <TableCell>Precio Venta </TableCell>
              <TableCell>Stock </TableCell>
              <TableCell>Acciones </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto, id) => (
              <Productos key={id} productos={producto} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
