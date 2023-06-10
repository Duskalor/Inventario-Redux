import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutProductosEntrada } from '../ProductoEntrada/LayoutProductosEntrada';
import { borrarEstado } from '../ProductoEntrada/productoEntradaSlice';
import { updateProductos } from '../Productos/productosSlice';
import { centrar } from '../style';
import { deleteEntradas } from './entradaSlice';
import { ModalEdit } from './ModalEdit';

export default function Entradas({ entrada }) {
  const { usuarios } = useSelector((state) => state.Usuarios);
  const { productoEntradaBD } = useSelector(
    (state) => state.ProductoEntrada,
    (prevData, nextData) =>
      prevData.productoEntradaBD === nextData.productoEntradaBD
  );
  // const { proveedores } = useSelector((state) => state.Proveedor);
  const { productos } = useSelector((state) => state.Productos);
  const dispatch = useDispatch();

  const {
    NumeroDocumento,
    CantidadProductos,
    // IdProveedor,
    IdUsuario,
    MontoTotal,
    id,
  } = entrada;
  // obteniendo al usuario para listarlo
  const usuario = usuarios.find((user) => user.id === IdUsuario);
  // obteniendo al proveedor para listarlo
  // const proveedor = proveedores.find(
  //   (proveedor) => proveedor.id === IdProveedor
  // );
  // obteniendo los productos para modificar el stock
  const ParaEliminar = productoEntradaBD.filter((pro) => pro.IdEntrada === id);

  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a esta Entrada ?')) {
      // modificando el stock con las cantidades de los productos eliminados
      ParaEliminar.forEach((pe) => {
        const productoAeditar = productos.find(
          (pro) => pro.id === pe.IdProducto
        );
        const pro = { ...productoAeditar };
        pro.Stock = pro.Stock - pe.Cantidad;
        dispatch(updateProductos(pro));
      });
      // eliminando estado
      dispatch(deleteEntradas(id));
      dispatch(borrarEstado());
    }
  };

  return (
    <TableRow>
      <TableCell sx={centrar}>
        <LayoutProductosEntrada NumeroDocumento={NumeroDocumento} />
      </TableCell>
      <TableCell sx={centrar}>{usuario.FullName}</TableCell>
      {/* <TableCell sx={centrar}>{proveedor.FullName}</TableCell> */}
      <TableCell sx={centrar}>{CantidadProductos}</TableCell>
      <TableCell sx={centrar}>{MontoTotal}</TableCell>
      <TableCell sx={centrar}>
        <ModalEdit id={id} />
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
