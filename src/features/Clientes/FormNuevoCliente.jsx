import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createClientes } from './clientesSlice';
import Button from '@mui/material/Button';

export default function FormNuevoCliente({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    dispatch(createClientes(dato));
    handleClose();
    reset();
    //console.log(d);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>
        <input
          type='text'
          {...register('FullName', {
            required: true,
          })}
        />
        {errors.FullName?.type === 'required' && <p>El Campo es requirido </p>}
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
    </form>
  );
}
