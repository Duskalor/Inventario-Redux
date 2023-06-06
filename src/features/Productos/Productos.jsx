import { Box, Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deleteProductos } from './productosSlice';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import { BoxStatus } from '../../components/BoxStatus';

export default function Productos({ productos }) {
  const {
    id,
    Categoria,
    Codigo,
    Descripcion,
    active,
    // PrecioCompra,
    // PrecioVenta,
    Stock,
  } = productos;
  const { id: idUser } = useUserLogin();
  //console.log(clientes);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteProductos(id));
    }
  };

  return (
    <>
      <TableRow
        sx={{
          '&>td>div': { display: 'flex', justifyContent: 'center' },
          '&>td': { height: '30px' },
        }}
      >
        <TableCell>
          <Box>{Codigo}</Box>
        </TableCell>
        <TableCell>{Descripcion}</TableCell>
        <TableCell>{Categoria}</TableCell>
        {/* <TableCell>{PrecioCompra}</TableCell> */}
        {roles.admin === idUser && (
          <TableCell>
            <BoxStatus active={active}>
              {active ? <Box>Active</Box> : <Box>No active</Box>}
            </BoxStatus>
          </TableCell>
        )}
        <TableCell>
          <Box>{Stock}</Box>
        </TableCell>

        <TableCell>
          <Box>
            {roles.admin === idUser && <ModalEdit id={id} />}
            <Button onClick={() => deleteItem(id)}>Eliminar</Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}
