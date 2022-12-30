import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutProductosEntrada } from '../ProductoEntrada/LayoutProductosEntrada';
import { LayoutProductosSalida } from '../ProductoSalidas/LayoutProductosSalida';
import { borrarEstado } from '../ProductoSalidas/productosSalidaSlice';
import { ModalEdit } from './ModalEdit';
import { deleteSalidas } from './salidasSlice';

export default function Salidas({ salida }) {
  const {
    NumeroDocumento,
    CantidadProductos,
    IdCliente,
    IdUsuario,
    MontoTotal,
    id,
  } = salida;

  const { usuarios } = useSelector((state) => state.Usuarios);
  const IdUsuarioEntrada = usuarios.find((user) => user.id === IdUsuario);

  const { clientes } = useSelector((state) => state.Clientes);
  const IdClienteEntrada = clientes.find((cliente) => cliente.id === IdCliente);

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteSalidas(id));
      dispatch(borrarEstado());
    }
  };

  return (
    <TableRow>
      <TableCell>
        <LayoutProductosSalida NumeroDocumento={NumeroDocumento} />
      </TableCell>
      <TableCell>{IdUsuarioEntrada.FullName}</TableCell>
      <TableCell>{IdClienteEntrada.FullName}</TableCell>
      <TableCell>{CantidadProductos}</TableCell>
      <TableCell>{MontoTotal}</TableCell>
      <TableCell>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
