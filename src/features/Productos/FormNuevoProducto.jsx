import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProducto } from './productosSlice';

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
      <h1>Nuevo Producto</h1>
      <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Codigo', {
            required: true,
          })}
          label='Codigo'
          variant='outlined'
        />

        {errors.Codigo?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Descripcion', {
            required: true,
          })}
          label='Descripción'
          variant='outlined'
        />
        {errors.Descripcion?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>

      <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Categoria', {
            required: true,
          })}
          label='Categoría'
          variant='outlined'
        />

        {errors.Categoria?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      {/* <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('PrecioCompra', {
            required: true,
          })}
          label='Precio Compra'
          variant='outlined'
        />
        {errors.PrecioCompra?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>
      <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('PrecioVenta', {
            required: true,
          })}
          label='Precio Venta'
          variant='outlined'
        />
        {errors.PrecioVenta?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div> */}
      <div>
        <TextField
          sx={{
            margin: '10px 0 0 0',
          }}
          type='text'
          {...register('Stock', {
            required: true,
          })}
          label='Stock'
          variant='outlined'
        />
        {errors.Stock?.type === 'required' && <p>El Campo es requirido </p>}
      </div>

      <Button
        sx={{
          mt: '1rem',
        }}
        type='submit'
        variant='contained'
      >
        Crear
      </Button>
    </form>
  );
}
