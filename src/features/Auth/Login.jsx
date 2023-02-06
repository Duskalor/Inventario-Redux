import {
  Box,
  Button,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { style, titulos } from '../style';
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
    <Box sx={{ ...style, width: 300, borderRadius: 4 }}>
      <div>
        <Typography sx={titulos} variant='h4' component='h2'>
          login
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                type='text'
                {...register('Usuario', {
                  required: true,
                })}
                label='Usuario'
                variant='outlined'
              />

              {errors.Usuario?.type === 'required' && (
                <p>El Campo es requirido </p>
              )}
            </div>
            <div>
              <TextField
                sx={{
                  margin: '20px 0 0 0',
                }}
                type='password'
                {...register('password', {
                  required: true,
                })}
                label='Password'
                variant='outlined'
              />
              {errors.password?.type === 'required' && (
                <p>El Campo es requirido </p>
              )}
            </div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                sx={{
                  margin: '20px 0 0 0',
                }}
                variant='contained'
                type='submit'
              >
                Ingresar
              </Button>
            </Box>
          </form>
        </Box>
      </div>
    </Box>
  );
}
