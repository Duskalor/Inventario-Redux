import { Box, Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductos } from '../Productos/productosSlice';
import { LayoutProductosSalida } from '../ProductoSalidas/LayoutProductosSalida';
import { borrarEstado } from '../ProductoSalidas/productosSalidaSlice';
import { centrar } from '../style';
// import ModalPrint from './ModalPrint';
import { deleteSalidas } from './salidasSlice';
import { BoxStatus } from '../../components/BoxStatus';
import { useProducts } from '../../utils/useProducts';
export default function Salidas({ salida }) {
  const {
    NumeroDocumento,
    CantidadProductos,
    // IdAlmacenes,
    IdUsuario,
    id,
    razonSalida,
    active,
    // updated_at: fecha,
  } = salida;

  const { usuarios } = useSelector((state) => state.Usuarios);

  const UsuarioSalida = usuarios.find((user) => user.id === IdUsuario);

  const { productoSalidaBD } = useSelector((state) => state.ProductoSalida);
  const productos = useProducts();
  const ParaEliminar = productoSalidaBD.filter((pro) => pro.IdSalida === id);

  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (window.confirm('Esta Seguro de eliminar a esta Entrada ?')) {
      ParaEliminar.forEach((pe) => {
        const productoAeditar = productos.find(
          (pro) => pro.id === +pe.IdProducto
        );
        const pro = structuredClone(productoAeditar);
        pro.Stock = pro.Stock + pe.Cantidad;
        dispatch(updateProductos(pro));
      });

      dispatch(deleteSalidas(id));
      dispatch(borrarEstado());
    }
  };
  // const ToPrint = { MontoTotal, id, IdUsuarioSalida, IdClienteSalida, fecha };

  return (
    <TableRow sx={centrar}>
      <TableCell>
        <LayoutProductosSalida NumeroDocumento={NumeroDocumento} />
      </TableCell>
      <TableCell>{UsuarioSalida?.FullName}</TableCell>
      <TableCell>{razonSalida}</TableCell>
      <TableCell>
        <BoxStatus active={active}>
          {active ? <Box>Active</Box> : <Box>No active</Box>}
        </BoxStatus>
      </TableCell>
      <TableCell>{CantidadProductos}</TableCell>
      <TableCell>
        <Button onClick={() => deleteItem(id)}>Eliminar</Button>
      </TableCell>
    </TableRow>
  );
}
