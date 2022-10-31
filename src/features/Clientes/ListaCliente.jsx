import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Cliente from './Cliente';
import { getClientes } from './clientesSlice';

export default function ListaCliente() {
  const { clientes } = useSelector((state) => state.Clientes);
  //console.log(clientes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClientes());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            type='text'
            {...register('FullName', {
              required: true,
            })}
          />
          {errors.FullName?.type === 'required' && (
            <p>El Campo es requirido </p>
          )}
        </div>
        <div>
          <label>Dni</label>
          <input
            {...register('Dni', { required: true, maxLength: 8, minLength: 8 })}
          />
          {errors.Dni?.type === 'required' && <p>El Campo es requirido </p>}
          {errors.Dni?.type === 'maxLength' && <p>El debe tener 8 digitos </p>}
          {errors.Dni?.type === 'minLength' && <p>El debe tener 8 digitos </p>}
        </div>
        <input type='submit' value='Crear' />
      </form> */}
      <TableContainer component={Paper}>
        <Table arial-label='simple tables'>
          <TableHead>
            <TableRow>
              <TableCell>Full Nombre</TableCell>
              <TableCell>Dni</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente, id) => (
              <Cliente cliente key={id} clientes={cliente} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
