import {
  Box,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
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
import { ChildModal } from './LayoutEntrada';

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
  const [BusquedaDescription, setBusquedaDescription] =
    useState('NumeroDocumento');
  const handleOnchangeFilterName = (e) => {
    setBusquedaDescription(e.target.value);
  };
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
          return entra[BusquedaDescription].toLowerCase().includes(
            Busqueda.toLowerCase()
          );
        })
      : entradas;
  }, [Busqueda, entradas]);

  // console.log(entradasFiltradas);

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            py: '0.5rem',
            '&>button': { m: '.5rem' },
          }}
        >
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={BusquedaDescription}
            label='filter'
            onChange={handleOnchangeFilterName}
          >
            <MenuItem value='NumeroDocumento'>Codigo</MenuItem>
            <MenuItem value='razonEntrada'>Razón</MenuItem>
          </Select>
          <ChildModal />
        </Box>
        <TextField
          sx={{
            display: 'flex',
          }}
          id='input-with-icon-textfield'
          value={Busqueda}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position='start'
                sx={{
                  my: '1.2rem',
                }}
              >
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
              <TableRow sx={{ '& th': { textAlign: 'center' } }}>
                <TableCell>Codigo Documento</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Razón Entrada</TableCell>
                <TableCell>Cantidad de Productos</TableCell>
                <TableCell>Almancén</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entradasFiltradas.length > 0 ? (
                [...entradasFiltradas]
                  .reverse()
                  .map((entrada, id) => <Entradas key={id} entrada={entrada} />)
              ) : (
                <TableRow>
                  <TableCell
                    sx={{ textAlign: 'center', fontSize: '2rem' }}
                    colSpan={7}
                  >
                    No existe codigo o razón de Entrada
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
