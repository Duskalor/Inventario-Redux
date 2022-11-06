import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deleteUsuarios } from './UsuariosSlice';

export default function Usuarios({ usuarios }) {
  const { FullName, Email, Usuario, IdPermisos, id } = usuarios;
  //console.log(clientes);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteUsuarios(id));
    }
  };

  return (
    <TableRow>
      <TableCell>{FullName}</TableCell>
      <TableCell>{Email}</TableCell>
      <TableCell>{Usuario}</TableCell>
      <TableCell>{IdPermisos}</TableCell>
      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
