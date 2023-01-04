import { Button, Checkbox, Input } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createpermisos } from './permisosSlice';

export default function FormNuevoPermiso({ handleClose }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (dato) => {
    reset();
    dato.Clientes = dato.Clientes ? (dato.Clientes = 1) : (dato.Clientes = 0);
    dato.Configuracion = dato.Configuracion
      ? (dato.Configuracion = 1)
      : (dato.Configuracion = 0);
    dato.Entradas = dato.Entradas ? (dato.Entradas = 1) : (dato.Entradas = 0);
    dato.Permisos = dato.Permisos ? (dato.Permisos = 1) : (dato.Permisos = 0);
    dato.Productos = dato.Productos
      ? (dato.Productos = 1)
      : (dato.Productos = 0);
    dato.Proveedores = dato.Proveedores
      ? (dato.Proveedores = 1)
      : (dato.Proveedores = 0);
    dato.Salidas = dato.Salidas ? (dato.Salidas = 1) : (dato.Salidas = 0);
    dato.Usuarios = dato.Usuarios ? (dato.Usuarios = 1) : (dato.Usuarios = 0);
    //console.log(dato);
    dispatch(createpermisos(dato));
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>
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
        <label>Salidas</label>
        <Checkbox defaultChecked {...register('Salidas')} />
      </div>
      <div>
        <label>Usuarios</label>
        <Checkbox defaultChecked {...register('Usuarios')} />
      </div>
      <div>
        <label>Entradas</label>
        <Checkbox defaultChecked {...register('Entradas')} />
      </div>
      <div>
        <label>Productos</label>
        <Checkbox defaultChecked {...register('Productos')} />
      </div>
      <div>
        <label>Clientes</label>
        <Checkbox {...register('Clientes')} />
      </div>
      <div>
        <label>Proveedores</label>
        <Checkbox {...register('Proveedores')} />
      </div>
      <div>
        <label>Permisos</label>
        <Checkbox {...register('Permisos')} />
      </div>
      <div>
        <label>Configuracion</label>
        <Checkbox {...register('Configuracion')} />
      </div>
      <Button type='submit'>Crear</Button>
    </form>
  );
}
