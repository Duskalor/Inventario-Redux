import { Box, Button, Input } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { style } from '../style';
import { login } from './authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (dato) => {
    dispatch(login(dato));
  };
  return (
    <Box sx={{ ...style, width: 300 }}>
      <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Usuario</label>
            <Input
              type='text'
              {...register('Usuario', {
                required: true,
              })}
            />
            {errors.Usuario?.type === 'required' && (
              <p>El Campo es requirido </p>
            )}
          </div>
          <div>
            <label>Password</label>
            <Input
              type='pasword'
              {...register('password', {
                required: true,
              })}
            />
            {errors.password?.type === 'required' && (
              <p>El Campo es requirido </p>
            )}
          </div>

          <Button type='submit'>Ingresar</Button>
        </form>
      </div>
    </Box>
  );
}
