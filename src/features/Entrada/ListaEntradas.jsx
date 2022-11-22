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
import Entradas from './Entradas';
import { getEntradas } from './entradaSlice';

export default function ListaEntradas() {
  // console.log(permisos);
  const { entradas } = useSelector((state) => state.Entrada);
  const { usuarios } = useSelector((state) => state.Usuarios);

  // const { entradas } = useSelector((state) => state.entrada);
  console.log(usuarios);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEntradas());
  }, []);

  return (
    <div>
      <h1>ENTRADAS</h1>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>NumeroDocumento</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Cantidad de Productos</TableCell>
              <TableCell>Monto Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entradas.map((entrada, id) => (
              <Entradas key={id} entradas={entrada} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
