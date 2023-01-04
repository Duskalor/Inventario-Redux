import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import ItemsForPrint from './ItemsForPrint';
import { getDetalleSalida } from '../ProductoSalidas/productosSalidaSlice';

export default function ForPrint({ ToPrint }) {
  //console.log(ToPrint);
  const { MontoTotal, id, IdClienteSalida, fecha } = ToPrint;
  const Datos = useSelector((state) => state.Datos);
  const dispatch = useDispatch();
  const { productoSalidaBD } = useSelector((state) => state.ProductoSalida);
  const Productos = productoSalidaBD.filter((pro) => pro.IdSalida == id);
  //console.log(Productos);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'data-print',
    // onAfterPrint: () => alert('print success'),
  });
  useEffect(() => {
    dispatch(getDetalleSalida());
  }, [dispatch]);

  return (
    <>
      <Box ref={componentRef}>
        <h1>
          <b>{Datos.RazonSocial}</b>
        </h1>
        <h3> {Datos.Direccion}</h3>
        <h3> R.U.C. {Datos.Ruc}</h3>
        <h3>Boleta de Venta 00{id}</h3>
        <h3>Señor(es) : {IdClienteSalida.FullName}</h3>
        <h3>DNI : {IdClienteSalida.Dni}</h3>
        <h3>Fecha de Emision : {fecha.substr(0, 10)}</h3>
        <TableContainer component={Paper}>
          <Table arial-label='simple tables'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: 'center' }}>CANT.</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>DESCRIPCIÓN</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>P. UNIT</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>IMPORTE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Productos.map((producto, id) => (
                <ItemsForPrint key={id} producto={producto} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography align='right' variant='subtitle1' mt={2} mr={3}>
          TOTAL : S/. {MontoTotal}
        </Typography>
      </Box>
      <Button onClick={handlePrint}> Imprimir </Button>
    </>
  );
}
