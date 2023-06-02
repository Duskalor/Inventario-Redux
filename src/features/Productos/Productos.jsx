import { Box, Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deleteProductos } from './productosSlice';

export default function Productos({ productos }) {
  const {
    id,
    Categoria,
    Codigo,
    Descripcion,
    // PrecioCompra,
    // PrecioVenta,
    Stock,
  } = productos;
  //console.log(clientes);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteProductos(id));
    }
  };

  return (
    <TableRow
      sx={{
        '&>td>div': { display: 'flex', justifyContent: 'center' },
      }}
    >
      <TableCell>
        <Box>{Codigo}</Box>
      </TableCell>
      <TableCell>{Descripcion}</TableCell>
      <TableCell>{Categoria}</TableCell>
      {/* <TableCell>{PrecioCompra}</TableCell>
      <TableCell>{PrecioVenta}</TableCell> */}
      <TableCell>
        <Box>{Stock}</Box>
      </TableCell>

      <TableCell>
        <Box>
          <ModalEdit id={id} />
          <Button onClick={() => deleteItem(id)}>Eliminar</Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}
