import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createAlmacenes } from './almacenesSlice';

export default function FormNuevoAlmacen({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    dispatch(createAlmacenes(dato));
    handleClose();
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Nuevo Almacen</h1>
      <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('name', {
            required: true,
          })}
          label='Nombre'
          variant='outlined'
        />

        {errors.name?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Direccion', {
            required: true,
          })}
          label='Direccion'
          variant='outlined'
        />

        {errors.Direccion?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('ubicacion', {
            required: true,
          })}
          label='ubicacion'
          variant='outlined'
        />
        {errors.ubicacion?.type === 'required' && <p>El Campo es requirido </p>}
        {/* {errors.ubicacion?.type === 'maxLength' && (
          <p>El debe tener 8 digitos </p>
        )}
        {errors.ubicacion?.type === 'minLength' && (
          <p>El debe tener 8 digitos </p>
        )} */}
      </div>

      <Button type='submit'>Crear</Button>
    </form>
  );
}
