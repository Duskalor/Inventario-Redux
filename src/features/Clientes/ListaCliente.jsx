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
import Cliente from './Cliente';
import { getClientes } from './clientesSlice';

export default function ListaCliente() {
  const { clientes } = useSelector((state) => state.Clientes);
  //console.log(clientes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientes());
  }, []);

  return (
    <div>
      <h1>CLIENTES</h1>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Full Nombre</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente, id) => (
              <Cliente cliente key={id} clientes={cliente} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
