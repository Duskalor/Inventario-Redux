import { TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteClientes } from './clientesSlice';

export default function Cliente({ clientes }) {
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
        <button>Editar</button>
        <button onClick={() => deleteItem(id)}>Eliminar</button>
      </TableCell>
    </TableRow>
  );
}
