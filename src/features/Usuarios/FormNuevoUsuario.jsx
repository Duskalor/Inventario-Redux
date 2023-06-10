import {
  Box,
  Button,
  Input,
  InputLabel,
  NativeSelect,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createUsuarios } from './UsuariosSlice';
import { BoxError } from '../../components/BoxError';
export default function FormNuevoUsuario({ handleClose }) {
  const { permisos } = useSelector((state) => state.Permisos);
  const { almacenes } = useSelector((state) => state.Almacenes);
  const dispatch = useDispatch();
  //console.log(permisos);
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant='h1' py={2}>
        Nuevo Usuario
      </Typography>
      <Box>
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
      </Box>
      <Box>
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
      </Box>
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Email
        </InputLabel>
        <Input
          type='text'
          {...register('email', {
            required: true,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Formato Incorrecto',
            },
          })}
        />
        {errors.email?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
        {errors.email?.type === 'pattern' && (
          <BoxError>{errors.email.message}</BoxError>
        )}
      </Box>

      <Box>
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
          <BoxError>El Campo es requirido </BoxError>
        )}
      </Box>

      {/* Almacen */}
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Almacenes
        </InputLabel>
        <NativeSelect
          {...register('IdAlmacenes', {
            required: true,
          })}
        >
          {almacenes.map((almacen) => {
            return (
              <option key={almacen.id} value={almacen.id}>
                {almacen.ubicacion}
              </option>
            );
          })}
        </NativeSelect>
        {errors.IdAlmacenes?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </Box>

      <Box>
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
        {errors.Password?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
        {errors.Password?.type === 'minLength' && (
          <BoxError>El debe tener 6 digitos </BoxError>
        )}
      </Box>
      {/* CONFIRMACION PASSWORD */}
      <Box>
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
          <BoxError>El Campo es requirido </BoxError>
        )}
        {errors.password_confirmation?.type === 'minLength' && (
          <BoxError>El debe tener 6 digitos </BoxError>
        )}
      </Box>
      <Button type='submit'>Crear</Button>
    </form>
  );
}
