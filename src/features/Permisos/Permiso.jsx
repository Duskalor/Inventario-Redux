import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteClientes } from './clientesSlice';
import { ModalEdit } from './ModalEdit';

export default function Permiso({ permisos }) {
  const { FullName, Dni, id } = clientes;
  //console.log(clientes);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteClientes(id));
    }
  };

  return (
    <TableRow>
      <TableCell>{FullName}</TableCell>
      <TableCell>{Dni}</TableCell>
      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
