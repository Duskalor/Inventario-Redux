import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function ProductosEntrada({ producto }) {
  const { IdProducto, PrecioCompra, Cantidad, SubTotal, id } = producto;

  const { productos } = useSelector((state) => state.Productos);

  const ListaProductos = productos.find((pro) => pro.id == IdProducto);
  console.log(ListaProductos);

  return (
    <TableRow>
      <TableCell>{ListaProductos.Codigo}</TableCell>
      <TableCell>{ListaProductos.Descripcion}</TableCell>
      <TableCell>{PrecioCompra}</TableCell>
      <TableCell>{Cantidad}</TableCell>
      <TableCell>{SubTotal}</TableCell>
    </TableRow>
  );
}
