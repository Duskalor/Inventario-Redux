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
  }, [dispatch]);

  return (
    <div>
      <h1>CLIENTES</h1>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: 'center' }}>Full Nombre</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>DNI</TableCell>
              <TableCell sx={{ textAlign: 'center' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente, id) => (
              <Cliente key={id} clientes={cliente} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
