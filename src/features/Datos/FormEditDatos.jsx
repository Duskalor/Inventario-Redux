import { Box, Button, Input, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { titulos } from '../style';
import { updateDatos } from './datosSlice';

export default function FormEditCliente({ handleClose }) {
  const dispatch = useDispatch();
  const { Datos } = useSelector((state) => state);
  const { RazonSocial, Direccion, Ruc, id } = Datos;
  // console.log(Datos);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      RazonSocial: RazonSocial,
      Direccion: Direccion,
      Ruc: Ruc,
    },
  });

  //console.log(datosParaEditar);
  const onSubmit = (dato) => {
    const { RazonSocial, Direccion, Ruc } = dato;
    dispatch(updateDatos({ id, RazonSocial, Direccion, Ruc }));
    handleClose();
    reset();
  };
  return (
    <Box>
      <Typography sx={titulos} variant='h4' component='h2'>
        Datos de la empresa
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
              sx={{
                margin: '10px 0 0 0',
              }}
              type='text'
              {...register('RazonSocial', {
                required: true,
              })}
              label='Razón Social'
              variant='outlined'
            />

            {errors.RazonSocial?.type === 'required' && (
              <p>El Campo es requirido </p>
            )}
          </div>
          <div>
            <TextField
              sx={{
                margin: '20px 0 0 0',
              }}
              type='number'
              {...register('Ruc', {
                required: true,
                maxLength: 11,
                minLength: 11,
              })}
              label='Ruc'
              variant='outlined'
            />
            {errors.Ruc?.type === 'required' && <p>El Campo es requirido </p>}
            {errors.Ruc?.type === 'maxLength' && (
              <p>El debe tener 11 digitos </p>
            )}
            {errors.Ruc?.type === 'minLength' && (
              <p>El debe tener 11 digitos </p>
            )}
          </div>

          <div>
            <TextField
              sx={{
                margin: '20px 0 0 0',
              }}
              type='text'
              {...register('Direccion', {
                required: true,
              })}
              label='Dirección'
              variant='outlined'
            />
            {errors.Direccion?.type === 'required' && (
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
              type='submit'
              variant='contained'
            >
              Guardar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
