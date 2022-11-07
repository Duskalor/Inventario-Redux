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
  // console.log(permisos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getpermisos());
  }, []);

  return (
    <div>
      <h1>PERMISOS</h1>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Descripcion</TableCell>
              <TableCell>Salidas</TableCell>
              <TableCell>Usuarios</TableCell>
              <TableCell>Entradas</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Clientes</TableCell>
              <TableCell>Proveedores</TableCell>
              <TableCell>Inventario</TableCell>
              <TableCell>Configuracion</TableCell>
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
