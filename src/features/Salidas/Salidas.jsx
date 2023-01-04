import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutProductosSalida } from '../ProductoSalidas/LayoutProductosSalida';
import { borrarEstado } from '../ProductoSalidas/productosSalidaSlice';
import ModalPrint from './ModalPrint';
import { deleteSalidas } from './salidasSlice';

export default function Salidas({ salida }) {
  const {
    NumeroDocumento,
    CantidadProductos,
    IdCliente,
    IdUsuario,
    MontoTotal,
    id,
    updated_at: fecha,
  } = salida;

  const { usuarios } = useSelector((state) => state.Usuarios);
  const IdUsuarioSalida = usuarios.find((user) => user.id === IdUsuario);

  const { clientes } = useSelector((state) => state.Clientes);
  const IdClienteSalida = clientes.find((cliente) => cliente.id === IdCliente);

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      dispatch(deleteSalidas(id));
      dispatch(borrarEstado());
    }
  };
  const ToPrint = { MontoTotal, id, IdUsuarioSalida, IdClienteSalida, fecha };

  return (
    <TableRow>
      <TableCell sx={{ textAlign: 'center' }}>
        <LayoutProductosSalida
          NumeroDocumento={NumeroDocumento}
          montoTotal={MontoTotal}
        />
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        {IdUsuarioSalida.FullName}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        {IdClienteSalida.FullName}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{CantidadProductos}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{MontoTotal}</TableCell>
      <TableCell sx={{ display: 'flex', textAlign: 'center' }}>
        <ModalPrint ToPrint={ToPrint} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
