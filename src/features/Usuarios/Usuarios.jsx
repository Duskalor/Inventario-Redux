import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deleteUsuarios } from './UsuariosSlice';

export default function Usuarios({ usuarios, permisos }) {
  const { FullName, Email, Usuario, IdPermisos, id } = usuarios;

  const { Descripcion } = permisos.find((permiso) => permiso.id === IdPermisos);
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
      <TableCell>{Descripcion}</TableCell>
      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
