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
import { getDetalleEntradas } from './productoEntradaSlice';
import ProductosEntrada from './ProductosEntrada';
// import { getpermisos } from './permisosSlice';

export default function ListaProductosEntrada({ codigo }) {
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);
  const { entradas } = useSelector((state) => state.Entrada);

  const codigoDocumento = entradas.find(
    (entrada) => entrada.NumeroDocumento === codigo
  );
  const listaProductosEntrada = productoEntrada.filter(
    (proEntrada) => proEntrada.IdEntrada === codigoDocumento.id
  );
  //console.log(listaProductosEntrada);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetalleEntradas());
  }, [dispatch]);

  return (
    <div>
      {/* <h1>PERMISOS</h1> */}
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Precio de Compra</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>SubTotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaProductosEntrada.map((producto, id) => (
              <ProductosEntrada key={id} producto={producto} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
