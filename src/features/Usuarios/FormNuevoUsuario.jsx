import { Button, Input, InputLabel, NativeSelect } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUsuarios } from './UsuariosSlice';

export default function FormNuevoUsuario({ handleClose }) {
  const { permisos } = useSelector((state) => state.Permisos);
  const dispatch = useDispatch();
  console.log(permisos);
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
    console.log(dato);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Crear Usuario</h1>
      <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Nombre
        </InputLabel>
        <Input
          type='text'
          {...register('FullName', {
            required: true,
          })}
        />
        {errors.FullName?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Usuario
        </InputLabel>
        <Input
          type='text'
          {...register('Usuario', {
            required: true,
          })}
        />
        {errors.Usuario?.type === 'required' && <p>El Campo es requirido </p>}
      </div>

      <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Email
        </InputLabel>
        <Input
          type='text'
          {...register('email', {
            required: true,
          })}
        />
        {errors.Email?.type === 'required' && <p>El Campo es requirido </p>}
      </div>

      {/* <div>
        <select
          {...register('IdPermisos', {
            required: true,
          })}
        >
          {permisos.map((permiso) => {
            return (
              <option key={permiso.id} value={permiso.id}>
                {permiso.Descripcion}
              </option>
            );
          })}
        </select>
        {errors.IdPermisos?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div> */}

      <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Permiso
        </InputLabel>
        <NativeSelect
          {...register('IdPermisos', {
            required: true,
          })}
        >
          {permisos.map((permiso) => {
            return (
              <option key={permiso.id} value={permiso.id}>
                {permiso.Descripcion}
              </option>
            );
          })}
        </NativeSelect>
        {errors.IdPermisos?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>

      {/* OTRO 
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
      </div> */}
      <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Password
        </InputLabel>
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
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Confirmar Password
        </InputLabel>
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
