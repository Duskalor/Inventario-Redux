import Productos from './Productos';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtrar, getProductos } from './productosSlice';

export default function ListaProductos() {
  const { productos, filtrado } = useSelector((state) => state.Productos);
  console.log(productos);
  const [Busqueda, setBusqueda] = useState('');

  console.log(filtrado);
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
      <h1>PRODUCTOS</h1>
      <div>
        <input
          value={Busqueda}
          type='text'
          placeholder='Código o descripción'
          onChange={handleChange}
        />
      </div>
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

          {filtrado.length != 0 ? (
            <TableBody>
              {filtrado.map((producto, id) => (
                <Productos key={id} productos={producto} />
              ))}
            </TableBody>
          ) : (
            <h1>No Existe el Producto</h1>
          )}

          {/* <TableBody>
            {filtrado.length != 0 ? (
              filtrado.map((producto, id) => (
                <Productos key={id} productos={producto} />
              ))
            ) : (
              <h1>No Existe el Producto</h1>
            )}
          </TableBody> */}
        </Table>
      </TableContainer>
    </div>
  );
}
