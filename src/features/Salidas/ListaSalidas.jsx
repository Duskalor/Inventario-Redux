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
import {
  createProductoSalida,
  getDetalleSalida,
} from '../ProductoSalidas/productosSalidaSlice';
import Salidas from './Salidas';
import { getSalidas } from './salidasSlice';

// import Entradas from './Entradas';
// import { getEntradas } from './entradaSlice';

export default function ListaSalidas() {
  const { salidas } = useSelector((state) => state.Salida);
  const { id: IdSalida } = useSelector((state) => state.Salida);
  const { productoSalida } = useSelector((state) => state.ProductoSalida);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSalidas());
    dispatch(getDetalleSalida());
    if (!IdSalida == '') {
      productoSalida.map((pe) => {
        //console.log(pe);
        dispatch(createProductoSalida({ IdSalida, pe }));
      });
    }
  }, [dispatch, IdSalida]);

  return (
    <div>
      <h1>SALIDAS</h1>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>
                Codigo Documento
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Vendedor</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Cliente</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>
                Cantidad de Productos
              </TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Monto Total</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salidas.map((salida, id) => (
              <Salidas key={id} salida={salida} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
