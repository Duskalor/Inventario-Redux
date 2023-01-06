import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutProductosEntrada } from '../ProductoEntrada/LayoutProductosEntrada';
import { borrarEstado } from '../ProductoEntrada/productoEntradaSlice';
import { getProductos, updateProductos } from '../Productos/productosSlice';
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

  //console.log(ParaEliminar);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a este cliente ?')) {
      ParaEliminar.map((pe) => {
        const productoAeditar = productos.find(
          (pro) => pro.id == pe.IdProducto
        );
        //console.log(pe.Cantidad, productoAeditar);
        const pro = { ...productoAeditar };
        //console.log(pro);
        pro.Stock = pro.Stock - pe.Cantidad;
        dispatch(updateProductos(pro));
        //console.log(pro.Stock);
      });

      dispatch(deleteEntradas(id));
      dispatch(borrarEstado());
    }
  };

  return (
    <TableRow>
      <TableCell sx={{ textAlign: 'center' }}>
        <LayoutProductosEntrada NumeroDocumento={NumeroDocumento} />
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        {IdUsuarioEntrada.FullName}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        {IdProveedorEntrada.FullName}
      </TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{CantidadProductos}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>{MontoTotal}</TableCell>
      <TableCell sx={{ textAlign: 'center' }}>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
