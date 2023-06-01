import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductoSalidaVista from './ProductoSalidaVista';
import { getDetalleSalida } from './productosSalidaSlice';
// import { getDetalleEntradas } from './productoEntradaSlice';
// import ProductoEntradaVista from './ProductoEntradaVista';
// import ProductosEntrada from './ProductosEntrada';
// import { getpermisos } from './permisosSlice';

export default function ListaProductosSalida({ codigo = null, montoTotal }) {
  // console.log(codigo);
  const dispatch = useDispatch();

  const { productoSalidaBD } = useSelector((state) => state.ProductoSalida);
  const { salidas } = useSelector((state) => state.Salidas);

  const codigoDocumento = salidas.find(
    (salida) => salida.NumeroDocumento === codigo
  );
  const listaProductosSalida = productoSalidaBD.filter(
    (proSalida) => proSalida.IdSalida === codigoDocumento.id
  );
  //console.log(listaProductosSalida);
  useEffect(() => {
    dispatch(getDetalleSalida());
  }, [dispatch]);

  return (
    <div>
      {/* <h1>PERMISOS</h1> */}
      <TableContainer component={Paper} style={{ maxHeight: 700 }}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>Codigo</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Producto</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                Precio de Compra
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Cantidad</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>SubTotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaProductosSalida.map((producto, id) => (
              <ProductoSalidaVista key={id} producto={producto} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography align='right' variant='subtitle1' mt={2} mr={3}>
        TOTAL : S/. {montoTotal}
      </Typography>
    </div>
  );
}
