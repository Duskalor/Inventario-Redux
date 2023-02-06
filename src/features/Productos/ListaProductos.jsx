import Productos from './Productos';
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtrar, getProductos } from './productosSlice';
import SearchIcon from '@mui/icons-material/Search';

export default function ListaProductos() {
  const { productos, filtrado } = useSelector((state) => state.Productos);
  //console.log(productos);
  const [Busqueda, setBusqueda] = useState('');

  //console.log(filtrado);
  //console.log(productos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    dispatch(filtrar(e.target.value));
  };

  return (
    <div>
      <Box
        sx={{
          justifyContent: 'space-evenly ',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          variant='h4'
          component='h2'
        >
          PRODUCTOS
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

      {filtrado.length != 0 ? (
        <TableContainer component={Paper}>
          <Table arial-label='simple tables'>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Precio Compra </TableCell>
                <TableCell>Precio Venta </TableCell>
                <TableCell>Stock </TableCell>
                <TableCell>Acciones </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filtrado.map((producto, id) => (
                <Productos key={id} productos={producto} />
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
          No Existe el Codigo o Producto
        </Typography>
      )}
    </div>
  );
}
