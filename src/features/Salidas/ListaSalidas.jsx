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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProductoSalida,
  getDetalleSalida,
} from '../ProductoSalidas/productosSalidaSlice';
import Salidas from './Salidas';
import { filtrar, getSalidas } from './salidasSlice';
import { getProductos } from '../Productos/productosSlice';
import { centrar, titulos } from '../style';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

// import Entradas from './Entradas';
// import { getEntradas } from './entradaSlice';

export default function ListaSalidas() {
  const { salidas, filtrado } = useSelector((state) => state.Salida);
  const [Busqueda, setBusqueda] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSalidas());
    dispatch(getProductos());
    dispatch(getDetalleSalida());
    return () => {};
  }, [dispatch]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    //console.log(e.target.value);
    dispatch(filtrar(e.target.value));
  };
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
      {filtrado.length !== 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: 550 }}>
          <Table stickyHeader arial-label='simple tables'>
            <TableHead>
              <TableRow>
                <TableCell sx={centrar}>Codigo Documento</TableCell>
                <TableCell sx={centrar}>Vendedor</TableCell>
                <TableCell sx={centrar}>Cliente</TableCell>
                <TableCell sx={centrar}>Dni</TableCell>
                <TableCell sx={centrar}>Cantidad de Productos</TableCell>
                <TableCell sx={centrar}>Monto Total</TableCell>
                <TableCell sx={centrar}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtrado.map((salida, id) => (
                <Salidas key={id} salida={salida} />
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
