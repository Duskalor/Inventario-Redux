import { Button, Input } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createProveedor } from './ProveedorSlice';

export default function FormNuevoProveedor({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    dispatch(createProveedor(dato));
    handleClose();
    reset();
    //console.log(d);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>
        <Input
          type='text'
          {...register('FullName', {
            required: true,
          })}
        />
        {errors.FullName?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <label>RUC</label>
        <Input
          type='number'
          {...register('Ruc', { required: true, maxLength: 11, minLength: 11 })}
        />
        {errors.Ruc?.type === 'required' && <p>El Campo es requirido </p>}
        {errors.Ruc?.type === 'maxLength' && <p>El debe tener 11 digitos </p>}
        {errors.Ruc?.type === 'minLength' && <p>El debe tener 11 digitos </p>}
      </div>

      <Button type='submit'>Crear</Button>
    </form>
  );
}
