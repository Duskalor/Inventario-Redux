import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEntradas } from './entradaSlice';
import { ModalEdit } from './ModalEdit';

export default function Entradas({ entradas }) {
  const {
    NumeroDocumento,
    CantidadProductos,
    IdProveedor,
    IdUsuario,
    MontoTotal,
    id,
  } = entradas;

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteEntradas(id));
    }
  };
  <h1>N/A</h1>;
  return (
    <TableRow>
      <TableCell>{NumeroDocumento}</TableCell>
      <TableCell>{IdProveedor}</TableCell>
      <TableCell>{IdUsuario}</TableCell>
      <TableCell>{CantidadProductos}</TableCell>
      <TableCell>{MontoTotal}</TableCell>
      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
