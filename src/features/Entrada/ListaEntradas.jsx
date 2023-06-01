import {
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetalleEntradas } from '../ProductoEntrada/productoEntradaSlice';
import { getProductos } from '../Productos/productosSlice';
import { centrar, titulos } from '../style';
import Entradas from './Entradas';
import { getEntradas } from './entradaSlice';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function ListaEntradas() {
  const { entradas } = useSelector(
    (state) => state.Entradas,
    (prevData, nextData) => prevData.entradas === nextData.entradas
  );
  const { productos } = useSelector(
    (state) => state.Productos,
    (prevData, nextData) => prevData.productos === nextData.productos
  );
  const [Busqueda, setBusqueda] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    if (entradas.length === 0) dispatch(getEntradas());
    if (productos.length === 0) dispatch(getProductos());
    dispatch(getDetalleEntradas());
  }, [dispatch]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const entradasFiltradas = useMemo(() => {
    return (Busqueda !== '') & (Busqueda !== null)
      ? entradas.filter((entra) => {
          return entra.NumeroDocumento.toLowerCase().includes(
            Busqueda.toLowerCase()
          );
        })
      : entradas;
  }, [Busqueda, entradas]);

  return (
    <div>
      <Box
        sx={{
          justifyContent: 'space-evenly ',
        }}
      >
        <Typography sx={titulos} variant='h4' component='h2'>
          ENTRADAS
        </Typography>

        <TextField
          sx={{
            display: 'flex',
          }}
          id='input-with-icon-textfield'
          value={Busqueda}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant='standard'
        />
      </Box>

      {entradas.length !== 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: 550 }}>
          <Table stickyHeader arial-label='simple tables'>
            <TableHead>
              <TableRow>
                <TableCell sx={centrar}>Codigo Documento</TableCell>
                <TableCell sx={centrar}>Usuario</TableCell>
                <TableCell sx={centrar}>Proveedor</TableCell>
                <TableCell sx={centrar}>Cantidad de Productos</TableCell>
                <TableCell sx={centrar}>Monto Total</TableCell>
                <TableCell sx={centrar}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entradasFiltradas.length > 0 ? (
                entradasFiltradas.map((entrada, id) => (
                  <Entradas key={id} entrada={entrada} />
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ ...centrar, fontSize: '2rem' }} colSpan={6}>
                    No existe codigo de Entrada
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '15px',
          }}
          variant='h4'
          component='h2'
        >
          No hay entradas existentes
        </Typography>
      )}
    </div>
  );
}
