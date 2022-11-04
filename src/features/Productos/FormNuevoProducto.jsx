import { Button, Input } from '@mui/material';
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
      <div>
        <label>Codigo</label>
        <Input
          type='text'
          {...register('Codigo', {
            required: true,
          })}
        />
        {errors.Codigo?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <label>Descripcion</label>
        <Input
          type='text'
          {...register('Descripcion', {
            required: true,
          })}
        />
        {errors.Descripcion?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>

      <div>
        <label>Categoria</label>
        <Input
          type='text'
          {...register('Categoria', {
            required: true,
          })}
        />
        {errors.Categoria?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <label>PrecioCompra</label>
        <Input
          type='number'
          {...register('PrecioCompra', {
            required: true,
          })}
        />
        {errors.PrecioCompra?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>
      <div>
        <label>PrecioVenta</label>
        <Input
          type='number'
          {...register('PrecioVenta', {
            required: true,
          })}
        />
        {errors.PrecioVenta?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>
      <div>
        <label>Stock</label>
        <Input
          type='number'
          {...register('Stock', {
            required: true,
          })}
        />
        {errors.Stock?.type === 'required' && <p>El Campo es requirido </p>}
      </div>

      <Button type='submit'>Crear</Button>
    </form>
  );
}
