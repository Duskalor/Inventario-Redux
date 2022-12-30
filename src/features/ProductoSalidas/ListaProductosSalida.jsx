import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductoSalidaVista from './ProductoSalidaVista';
import { getDetalleSalida } from './productosSalidaSlice';
// import { getDetalleEntradas } from './productoEntradaSlice';
// import ProductoEntradaVista from './ProductoEntradaVista';
// import ProductosEntrada from './ProductosEntrada';
// import { getpermisos } from './permisosSlice';

export default function ListaProductosSalida({ codigo }) {
  const dispatch = useDispatch();

  const { productoSalidaBD } = useSelector((state) => state.ProductoSalida);
  const { salidas } = useSelector((state) => state.Salida);

  const codigoDocumento = salidas.find(
    (salida) => salida.NumeroDocumento === codigo
  );
  const listaProductosSalida = productoSalidaBD.filter(
    (proSalida) => proSalida.IdSalida === codigoDocumento.id
  );
  //console.log(listaProductosSalida);
  useEffect(() => {
    //console.log(productoEntradaBD);
    dispatch(getDetalleSalida());
  }, [dispatch]);
  return (
    <div>
      {/* <h1>PERMISOS</h1> */}
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Codigo</TableCell>
              <TableCell>Producto</TableCell>
              <TableCell>Precio de Compra</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>SubTotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaProductosSalida.map((producto, id) => (
              <ProductoSalidaVista key={id} producto={producto} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
