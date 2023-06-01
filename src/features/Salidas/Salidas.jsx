import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductos } from '../Productos/productosSlice';
import { LayoutProductosSalida } from '../ProductoSalidas/LayoutProductosSalida';
import { borrarEstado } from '../ProductoSalidas/productosSalidaSlice';
import { centrar } from '../style';
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
  const { productoSalidaBD } = useSelector((state) => state.ProductoSalida);
  const { productos } = useSelector((state) => state.Productos);

  const ParaEliminar = productoSalidaBD.filter((pro) => pro.IdSalida === id);

  //console.log(ParaEliminar);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a esta Entrada ?')) {
      ParaEliminar.forEach((pe) => {
        const productoAeditar = productos.find(
          (pro) => pro.id === +pe.IdProducto
        );
        //console.log(pe.Cantidad, productoAeditar);
        const pro = { ...productoAeditar };
        //console.log(pro);
        pro.Stock = pro.Stock + pe.Cantidad;
        dispatch(updateProductos(pro));
        //console.log(pro.Stock);
      });

      dispatch(deleteSalidas(id));
      dispatch(borrarEstado());
    }
  };
  const ToPrint = { MontoTotal, id, IdUsuarioSalida, IdClienteSalida, fecha };

  return (
    <TableRow>
      <TableCell sx={centrar}>
        <LayoutProductosSalida
          NumeroDocumento={NumeroDocumento}
          montoTotal={MontoTotal}
        />
      </TableCell>
      <TableCell sx={centrar}>{IdUsuarioSalida.FullName}</TableCell>
      <TableCell sx={centrar}>{IdClienteSalida.FullName}</TableCell>
      <TableCell sx={centrar}>{IdClienteSalida.Dni}</TableCell>
      <TableCell sx={centrar}>{CantidadProductos}</TableCell>
      <TableCell sx={centrar}>{MontoTotal}</TableCell>
      <TableCell sx={{ ...centrar, display: 'flex' }}>
        <ModalPrint ToPrint={ToPrint} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
