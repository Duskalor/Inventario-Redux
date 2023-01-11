import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getDatosReports } from './reportSlice';
import SyncIcon from '@mui/icons-material/Sync';
import { getProductos } from '../Productos/productosSlice';
import { getEntradas } from '../Entrada/entradaSlice';
import { getSalidas } from '../Salidas/salidasSlice';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useForm } from 'react-hook-form';
export default function GenerarReporte() {
  const { DatosReports } = useSelector((state) => state.Report);
  const { productos } = useSelector((state) => state.Productos);
  const { entradas } = useSelector((state) => state.Entrada);
  const { salidas } = useSelector((state) => state.Salida);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //console.log(DatosReports);
  useEffect(() => {
    dispatch(getDatosReports());
    if (productos.length === 0) {
      dispatch(getProductos());
    }
    if (entradas.length === 0) {
      dispatch(getEntradas());
    }
    if (salidas.length === 0) {
      dispatch(getSalidas());
    }
  }, [dispatch]);

  const onSubmit = (dato) => {
    // dispatch(createClientes(dato));
    // handleClose();
    // reset();
    console.log(dato);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>Opcines</FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='female'
            name='radio-buttons-group'
          >
            <FormControlLabel
              {...register('Opcion')}
              value='Day'
              control={<Radio />}
              label='Dia'
            />
            <FormControlLabel
              {...register('Opcion')}
              value='Month'
              control={<Radio />}
              label='Mes'
            />
            <FormControlLabel
              {...register('Opcion')}
              value='Year'
              control={<Radio />}
              label='Año'
            />
          </RadioGroup>
        </FormControl>

        <Button type='submit'>Crear</Button>
      </form>
    </>
  );
}
