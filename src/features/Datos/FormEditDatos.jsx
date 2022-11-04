import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
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
    <>
      <h1>Datos de la empresa</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Razón Social</label>
          <Input
            type='text'
            name='RazonSocial'
            {...register('RazonSocial', {
              required: true,
            })}
          />
          {errors.RazonSocial?.type === 'required' && (
            <p>El Campo es requirido </p>
          )}
        </div>
        <div>
          <label>Ruc</label>
          <Input
            name='Ruc'
            type='number'
            {...register('Ruc', {
              required: true,
              maxLength: 11,
              minLength: 11,
            })}
          />
          {errors.Ruc?.type === 'required' && <p>El Campo es requirido </p>}
          {errors.Ruc?.type === 'maxLength' && <p>El debe tener 11 digitos </p>}
          {errors.Ruc?.type === 'minLength' && <p>El debe tener 11 digitos </p>}
        </div>

        <div>
          <label>Dirección</label>
          <Input
            type='text'
            name='Direccion'
            {...register('Direccion', {
              required: true,
            })}
          />
          {errors.Direccion?.type === 'required' && (
            <p>El Campo es requirido </p>
          )}
        </div>

        <Button type='submit'>Guardar</Button>
      </form>
    </>
  );
}
