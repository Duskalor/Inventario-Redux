import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProducto } from './productosSlice';
import { BoxError } from '../../components/BoxError';

export default function FormNuevoProducto({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = (dato) => {
    dispatch(createProducto(dato));
    handleClose();
    reset();
    //console.log(d);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h1' py={2}>
        Nuevo Producto
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box>
          <TextField
            sx={{ margin: '10px 0 0 0' }}
            type='text'
            {...register('Codigo', { required: true })}
            label='Codigo'
            variant='outlined'
          />

          {errors.Codigo?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
        </Box>
        <Box>
          <TextField
            sx={{ margin: '10px 0 0 0' }}
            type='text'
            {...register('Descripcion', { required: true })}
            label='Descripción'
            variant='outlined'
          />
          {errors.Descripcion?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
        </Box>

        <Box>
          <TextField
            sx={{ margin: '10px 0 0 0' }}
            type='text'
            {...register('Categoria', { required: true })}
            label='Categoría'
            variant='outlined'
          />

          {errors.Categoria?.type === 'required' && (
            <BoxError>El Campo es requirido </BoxError>
          )}
        </Box>
      </Box>

      <Button sx={{ mt: '1rem' }} type='submit' variant='contained'>
        Crear
      </Button>
    </form>
  );
}
