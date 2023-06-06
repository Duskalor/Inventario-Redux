import Productos from './Productos';
import {
  Box,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
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
import { roles, useUserLogin } from '../../utils/useUserLogin';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export default function ListaProductos() {
  const { productos, loading } = useSelector((state) => state.Productos);
  const { id } = useUserLogin();
  const [Busqueda, setBusqueda] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const productosFiltrados = useMemo(() => {
    setPage(0);
    return Busqueda !== '' && Busqueda !== null
      ? productos.filter((pro) =>
          pro.Codigo.toLowerCase().includes(Busqueda.toLowerCase())
        )
      : productos;
  }, [productos, Busqueda]);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - productosFiltrados.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const PaginationData = [...productosFiltrados].reverse();

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
        <TableContainer
          component={Paper}
          sx={{
            height: '600px',
          }}
        >
          <Table arial-label='simple tables'>
            <TableHead>
              <TableRow
                sx={{
                  '&>th': { textAlign: 'center' },
                }}
              >
                <TableCell sx={{ width: '70px' }}>Código</TableCell>
                <TableCell sx={{ width: '420px' }}>Descripción</TableCell>
                <TableCell sx={{ width: '140px' }}>Categoría</TableCell>
                {roles.admin === id && (
                  <TableCell sx={{ width: '70px' }}>Status </TableCell>
                )}
                <TableCell>Stock </TableCell>
                <TableCell>Acciones </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productosFiltrados.length > 0 ? (
                (rowsPerPage > 0
                  ? PaginationData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : productosFiltrados
                ).map((producto, id) => (
                  <Productos key={id} productos={producto} />
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ ...centrar, fontSize: '2rem' }} colSpan={7}>
                    El codigo no existe
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && productosFiltrados.length > 0 && (
                <TableRow
                  style={{
                    height: 69.5 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {productosFiltrados.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      7,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    colSpan={6}
                    count={productosFiltrados.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'filas por paginas',
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            )}
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
          {loading ? (
            <HourglassBottomIcon sx={{ fontSize: 60 }} />
          ) : (
            <p>No hay productos ingresados</p>
          )}
        </Typography>
      )}
    </div>
  );
}
