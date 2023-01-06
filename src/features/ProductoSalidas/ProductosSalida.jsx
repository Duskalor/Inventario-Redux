import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { borrarItem } from './productosSalidaSlice';

export default function ProductosSalida({ producto }) {
  const { IdProducto, PrecioCompra, Cantidad, SubTotal } = producto;

  const { productos } = useSelector((state) => state.Productos);
  //console.log(producto, productos);
  const ListaProductos = productos.find((pro) => pro.id == IdProducto);
  //console.log(ListaProductos);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(borrarItem(id));
    }
  };

  return (
    <TableRow>
      <TableCell>{ListaProductos.Codigo}</TableCell>
      <TableCell>{ListaProductos.Descripcion}</TableCell>
      <TableCell>{PrecioCompra}</TableCell>
      <TableCell>{Cantidad}</TableCell>
      <TableCell>{SubTotal}</TableCell>
      <TableCell>
        <Button onClick={() => deleteItem(IdProducto)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}