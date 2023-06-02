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
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos } from './productosSlice';
import SearchIcon from '@mui/icons-material/Search';
import { centrar, titulos } from '../style';
import { ChildModal } from './LayoutProducto';

export default function ListaProductos() {
  const { productos } = useSelector(
    (state) => state.Productos,
    (prevData, nextData) => prevData.productos === nextData.productos
  );
  const [Busqueda, setBusqueda] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const productosFiltrados = useMemo(() => {
    return Busqueda !== '' && Busqueda !== null
      ? productos.filter((pro) =>
          pro.Codigo.toLowerCase().includes(Busqueda.toLowerCase())
        )
      : productos;
  }, [productos, Busqueda]);

  return (
    <div>
      <Box
        sx={{
          justifyContent: 'space-evenly ',
        }}
      >
        <Typography sx={titulos} variant='h4' component='h2'>
          PRODUCTOS
        </Typography>
        <ChildModal />
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

      {productos.length !== 0 ? (
        <TableContainer component={Paper}>
          <Table arial-label='simple tables'>
            <TableHead>
              <TableRow
                sx={{
                  '&>th': { textAlign: 'center' },
                }}
              >
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Categoría</TableCell>
                {/* <TableCell>Precio Compra </TableCell>
                <TableCell>Precio Venta </TableCell> */}
                <TableCell>Stock </TableCell>
                <TableCell>Acciones </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((producto, id) => (
                  <Productos key={id} productos={producto} />
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ ...centrar, fontSize: '2rem' }} colSpan={7}>
                    El codigo no existe
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
          No hay productos ingresados
        </Typography>
      )}
    </div>
  );
}
