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
import Permiso from './Permiso';
import { getpermisos } from './permisosSlice';

export default function ListaPermisos() {
  const { permisos } = useSelector((state) => state.Permisos);
  //console.log(clientes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getpermisos());
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
            {permisos.map((permiso, id) => (
              <Permiso key={id} permisos={permiso} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
