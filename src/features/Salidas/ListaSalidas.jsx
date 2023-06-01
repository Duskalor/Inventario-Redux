import {
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
import { getDetalleSalida } from '../ProductoSalidas/productosSalidaSlice';
import Salidas from './Salidas';
import { getSalidas } from './salidasSlice';
import { getProductos } from '../Productos/productosSlice';
import { centrar, titulos } from '../style';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function ListaSalidas() {
  const { salidas } = useSelector((state) => state.Salidas);
  const [Busqueda, setBusqueda] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSalidas());
    dispatch(getProductos());
    dispatch(getDetalleSalida());
  }, [dispatch]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const salidasFiltradas = useMemo(() => {
    return Busqueda !== '' && Busqueda !== null
      ? salidas.filter((prod) =>
          prod.NumeroDocumento.toLowerCase().includes(Busqueda.toLowerCase())
        )
      : salidas;
  }, [Busqueda, salidas]);
  // console.log({ salidasFiltradas });
  return (
    <div>
      <Typography sx={titulos} variant='h4' component='h2'>
        SALIDAS
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
      {salidas.length !== 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: 550 }}>
          <Table stickyHeader arial-label='simple tables'>
            <TableHead>
              <TableRow
                sx={{
                  '&>th': { textAlign: 'center' },
                }}
              >
                <TableCell>Codigo Documento</TableCell>
                <TableCell>Vendedor</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Dni</TableCell>
                <TableCell>Cantidad de Productos</TableCell>
                <TableCell>Monto Total</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salidasFiltradas.length > 0 ? (
                salidasFiltradas.map((salida, id) => (
                  <Salidas key={id} salida={salida} />
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ ...centrar, fontSize: '2rem' }} colSpan={6}>
                    No existe codigo de Salida
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
          No hay salidas existentes
        </Typography>
      )}
    </div>
  );
}
