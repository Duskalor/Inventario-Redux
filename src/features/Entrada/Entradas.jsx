import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutProductosEntrada } from '../ProductoEntrada/LayoutProductosEntrada';
import { borrarEstado } from '../ProductoEntrada/productoEntradaSlice';
import { updateProductos } from '../Productos/productosSlice';
import { centrar } from '../style';
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
  const { productoEntradaBD } = useSelector((state) => state.ProductoEntrada);
  const { proveedores } = useSelector((state) => state.Proveedor);
  const { productos } = useSelector((state) => state.Productos);
  const IdProveedorEntrada = proveedores.find(
    (proveedor) => proveedor.id === IdProveedor
  );
  const ParaEliminar = productoEntradaBD.filter((pro) => pro.IdEntrada === id);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a esta Entrada ?')) {
      ParaEliminar.map((pe) => {
        const productoAeditar = productos.find(
          (pro) => pro.id == pe.IdProducto
        );
        const pro = { ...productoAeditar };
        pro.Stock = pro.Stock - pe.Cantidad;
        dispatch(updateProductos(pro));
      });
      dispatch(deleteEntradas(id));
      dispatch(borrarEstado());
    }
  };

  return (
    <TableRow>
      <TableCell sx={centrar}>
        <LayoutProductosEntrada NumeroDocumento={NumeroDocumento} />
      </TableCell>
      <TableCell sx={centrar}>{IdUsuarioEntrada.FullName}</TableCell>
      <TableCell sx={centrar}>{IdProveedorEntrada.FullName}</TableCell>
      <TableCell sx={centrar}>{CantidadProductos}</TableCell>
      <TableCell sx={centrar}>{MontoTotal}</TableCell>
      <TableCell sx={centrar}>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
