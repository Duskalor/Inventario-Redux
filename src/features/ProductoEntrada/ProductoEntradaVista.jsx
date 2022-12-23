import { Button, TableCell, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { set } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { borrarItem, borrarItemEdit } from './productoEntradaSlice';

export default function ProductoEntradaVista({ producto }) {
  const { IdProducto, PrecioCompra, Cantidad, SubTotal } = producto;

  const { productos } = useSelector((state) => state.Productos);
  //console.log(producto);

  const ListaProductos = productos.find((pro) => pro.id == IdProducto);

  return (
    producto && (
      <TableRow>
        <TableCell>{ListaProductos.Codigo}</TableCell>
        <TableCell>{ListaProductos.Descripcion}</TableCell>
        <TableCell>{PrecioCompra}</TableCell>
        <TableCell>{Cantidad}</TableCell>
        <TableCell>{SubTotal}</TableCell>
      </TableRow>
    )
  );
}
