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
import { titulos } from '../style';
import Permiso from './Permiso';
import { getpermisos } from './permisosSlice';

export default function ListaPermisos() {
  const { permisos } = useSelector(
    (state) => state.Permisos,
    (prevData, nextData) => prevData.productos === nextData.productos
  );
  // console.log(permisos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getpermisos());
  }, []);

  return (
    <div>
      <Typography sx={titulos} variant='h4' component='h2'>
        PERMISOS
      </Typography>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Salidas</TableCell>
              <TableCell>Usuarios</TableCell>
              <TableCell>Entradas</TableCell>
              <TableCell>Productos</TableCell>
              <TableCell>Clientes</TableCell>
              <TableCell>Proveedores</TableCell>
              <TableCell>Permisos</TableCell>
              <TableCell>Configuración</TableCell>
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
