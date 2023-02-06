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
import Usuarios from './Usuarios';
import { getUsuarios } from './UsuariosSlice';

export default function ListaUsuarios() {
  const { usuarios } = useSelector((state) => state.Usuarios);
  const { permisos } = useSelector((state) => state.Permisos);
  //console.log(permisos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);
  return (
    <div>
      <Typography sx={titulos} variant='h4' component='h2'>
        USUARIOS
      </Typography>
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Full Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Permisos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario, id) => (
              <Usuarios key={id} usuarios={usuario} permisos={permisos} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
