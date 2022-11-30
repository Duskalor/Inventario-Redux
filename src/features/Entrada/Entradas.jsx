import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutProductosEntrada } from '../ProductoEntrada/LayoutProductosEntrada';
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

  const { usuarios } = useSelector((state) => state.Usuarios);
  const IdUsuarioEntrada = usuarios.find((user) => user.id === IdUsuario);

  const { proveedores } = useSelector((state) => state.Proveedor);
  const IdProveedorEntrada = proveedores.find(
    (proveedor) => proveedor.id === IdProveedor
  );

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteEntradas(id));
    }
  };
  <h1>N/A</h1>;
  return (
    <TableRow>
      <TableCell>
        <LayoutProductosEntrada NumeroDocumento={NumeroDocumento} />
      </TableCell>
      <TableCell>{IdUsuarioEntrada.FullName}</TableCell>
      <TableCell>{IdProveedorEntrada.FullName}</TableCell>
      <TableCell>{CantidadProductos}</TableCell>
      <TableCell>{MontoTotal}</TableCell>
      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
