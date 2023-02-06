import { Box, Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteClientes } from './clientesSlice';
import { ModalEdit } from './ModalEdit';

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
      <TableCell sx={{ textAlign: 'center' }}>{FullName}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{Dni}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <ModalEdit id={id} />
        <Box>
          <Button onClick={() => deleteItem(id)}>Eliminar</Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}
