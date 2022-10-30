import { TableCell, TableRow } from '@mui/material';
import React from 'react';

export default function Cliente({ clientes }) {
  const { FullName, Dni } = clientes;
  //console.log(clientes);
  return (
    <TableRow>
      <TableCell>{FullName}</TableCell>
      <TableCell>{Dni}</TableCell>
      <TableCell>
        <button>Editar</button>

        <button>Eliminar</button>
      </TableCell>
    </TableRow>
  );
}
