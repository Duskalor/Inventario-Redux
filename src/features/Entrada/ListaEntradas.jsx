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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDetalleEntradas } from '../ProductoEntrada/productoEntradaSlice';
import { getProductos } from '../Productos/productosSlice';
import { centrar, titulos } from '../style';
import Entradas from './Entradas';
import { filtrar, getEntradas } from './entradaSlice';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function ListaEntradas() {
  const { entradas, filtrado } = useSelector((state) => state.Entrada);
  const { productos } = useSelector((state) => state.Productos);
  const [Busqueda, setBusqueda] = useState('');

  //console.log(entradas);
  const dispatch = useDispatch();
  useEffect(() => {
    if (entradas.length === 0) dispatch(getEntradas());
    if (productos.length === 0) dispatch(getProductos());
    dispatch(getDetalleEntradas());

    return () => {};
  }, [dispatch]);
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    //console.log(e.target.value);
    dispatch(filtrar(e.target.value));
  };
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

      {filtrado.length !== 0 ? (
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
              {filtrado.map((entrada, id) => (
                <Entradas key={id} entradas={entrada} />
              ))}
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
          No Existe el Codigo
        </Typography>
      )}
    </div>
  );
}
