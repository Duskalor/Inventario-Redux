import { Button, Input } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createUsuarios } from './UsuariosSlice';

export default function FormNuevoUsuario({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    dispatch(createUsuarios(dato));
    handleClose();
    reset();
    //console.log(dato);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Crear Usuario</h1>
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
        <label>Usuario</label>
        <Input
          type='text'
          {...register('Usuario', {
            required: true,
          })}
        />
        {errors.Usuario?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <label>Email</label>
        <Input
          type='text'
          {...register('email', {
            required: true,
          })}
        />
        {errors.Email?.type === 'required' && <p>El Campo es requirido </p>}
      </div>

      <div>
        <label>Permiso</label>
        <Input
          type='number'
          {...register('IdPermisos', {
            required: true,
          })}
        />
        {errors.IdPermisos?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>
      <div>
        <label>Password</label>
        <Input
          type='password'
          {...register('password', {
            required: true,
            minLength: 6,
          })}
        />
        {errors.Password?.type === 'required' && <p>El Campo es requirido </p>}
        {errors.Password?.type === 'minLength' && (
          <p>El debe tener 6 digitos </p>
        )}
      </div>
      {/* CONFIRMACION PASSWORD */}
      <div>
        <label>Confirmar Password</label>
        <Input
          type='password'
          {...register('password_confirmation', {
            required: true,
            minLength: 6,
          })}
        />
        {errors.password_confirmation?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
        {errors.password_confirmation?.type === 'minLength' && (
          <p>El debe tener 6 digitos </p>
        )}
      </div>

      <Button type='submit'>Crear</Button>
    </form>
  );
}
