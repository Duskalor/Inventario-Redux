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
import Proveedor from './Proveedor';
import { getProveedor } from './ProveedorSlice';

export default function ListaProveedores() {
  const { proveedores } = useSelector((state) => state.Proveedor);
  // console.log(proveedores);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProveedor());
  }, [dispatch]);

  return (
    <div>
      <h1>CLIENTES</h1>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Full Nombre</TableCell>
              <TableCell>RUC</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proveedores.map((proveedor, id) => (
              <Proveedor key={id} proveedores={proveedor} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
