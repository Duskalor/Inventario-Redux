import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';

export default function Cliente({ productos }) {
  const {
    id,
    Categoria,
    Codigo,
    Descripcion,
    PrecioCompra,
    PrecioVenta,
    Stock,
  } = productos;
  //console.log(clientes);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    // if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
    //   dispatch(deleteClientes(id));
    // }
  };

  return (
    <TableRow>
      <TableCell>{Codigo}</TableCell>
      <TableCell>{Descripcion}</TableCell>
      <TableCell>{Categoria}</TableCell>
      <TableCell>{PrecioCompra}</TableCell>
      <TableCell>{PrecioVenta}</TableCell>
      <TableCell>{Stock}</TableCell>

      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
