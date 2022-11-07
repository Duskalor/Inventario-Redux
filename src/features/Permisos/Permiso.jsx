import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deletepermisos } from './permisosSlice';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearIcon from '@mui/icons-material/Clear';
export default function Permiso({ permisos }) {
  const {
    Descripcion,
    Salidas,
    Usuarios,
    Entradas,
    Productos,
    Clientes,
    Proveedores,
    Inventario,
    Configuracion,
    id,
  } = permisos;
  //console.log(clientes);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deletepermisos(id));
    }
  };

  return (
    <TableRow>
      <TableCell>{Descripcion}</TableCell>
      <TableCell>
        {Salidas === 1 ? <CheckRoundedIcon /> : <ClearIcon />}
      </TableCell>
      <TableCell>
        {Usuarios === 1 ? <CheckRoundedIcon /> : <ClearIcon />}
      </TableCell>
      <TableCell>
        {Entradas === 1 ? <CheckRoundedIcon /> : <ClearIcon />}
      </TableCell>
      <TableCell>
        {Productos === 1 ? <CheckRoundedIcon /> : <ClearIcon />}
      </TableCell>
      <TableCell>
        {Clientes === 1 ? <CheckRoundedIcon /> : <ClearIcon />}
      </TableCell>
      <TableCell>
        {Proveedores === 1 ? <CheckRoundedIcon /> : <ClearIcon />}
      </TableCell>
      <TableCell>
        {Inventario === 1 ? <CheckRoundedIcon /> : <ClearIcon />}
      </TableCell>
      <TableCell>
        {Configuracion === 1 ? <CheckRoundedIcon /> : <ClearIcon />}
      </TableCell>
      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
