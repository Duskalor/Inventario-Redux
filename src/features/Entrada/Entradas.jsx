import { Box, Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LayoutProductosEntrada } from '../ProductoEntrada/LayoutProductosEntrada';
import { borrarEstado } from '../ProductoEntrada/productoEntradaSlice';
import { updateProductos } from '../Productos/productosSlice';
// import { centrar } from '../style';
import { deleteEntradas } from './entradaSlice';
import { ModalEdit } from './ModalEdit';
import { BoxStatus } from '../../components/BoxStatus';
import { BoxContainer } from '../../components/BoxContainer';
import { useProducts } from '../../utils/useProducts';

export default function Entradas({ entrada }) {
  const { usuarios } = useSelector((state) => state.Usuarios);
  const { almacenes } = useSelector((state) => state.Almacenes);
  const { productoEntradaBD } = useSelector(
    (state) => state.ProductoEntrada,
    (prevData, nextData) =>
      prevData.productoEntradaBD === nextData.productoEntradaBD
  );
  const productos = useProducts();
  const dispatch = useDispatch();

  const {
    NumeroDocumento,
    CantidadProductos,
    IdUsuario,
    active,
    id,
    IdAlmacenes,
    razonEntrada,
  } = entrada;

  // obteniendo al usuario para listarlo
  const usuario = usuarios.find((user) => user.id === IdUsuario);
  const almacen = almacenes.find((alma) => alma.id === IdAlmacenes);
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
    <TableRow sx={{ '& td': { textAlign: 'center' } }}>
      <TableCell>
        <LayoutProductosEntrada NumeroDocumento={NumeroDocumento} />
      </TableCell>
      <TableCell>{usuario.FullName}</TableCell>
      <TableCell sx={{ width: '77px' }}>
        <BoxStatus active={active}>
          {active ? <Box>Active</Box> : <Box>No active</Box>}
        </BoxStatus>
      </TableCell>

      <TableCell sx={{ width: '100px', wordWrap: 'break-word' }}>
        {razonEntrada === '' ? 'Sin Razón' : razonEntrada}
      </TableCell>

      <TableCell sx={{ width: '77px' }}>{CantidadProductos}</TableCell>
      <TableCell sx={{ width: '77px' }}>{almacen.ubicacion}</TableCell>

      <TableCell>
        <BoxContainer>
          <ModalEdit id={id} />
          <Button onClick={() => deleteItem(id)}>Eliminar</Button>
        </BoxContainer>
      </TableCell>
    </TableRow>
  );
}
