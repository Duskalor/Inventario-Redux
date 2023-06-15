import {
  Box,
  Button,
  Input,
  InputLabel,
  NativeSelect,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FormNuevoProductoEntrada from '../ProductoEntrada/FormNuevoProductoEntrada';
import { createEntradas } from './entradaSlice';
import EmptyTextarea from '../../components/TextArea';
import { BoxError } from '../../components/BoxError';
import { useState } from 'react';
import { useUserLogin } from '../../utils/useUserLogin';
export default function FormNuevaEntrada({ handleClose }) {
  const { IdAlmacenes } = useUserLogin();

  const { usuarios } = useSelector((state) => state.Usuarios);
  const TextArea = EmptyTextarea();
  const { entradas } = useSelector((state) => state.Entradas);
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);
  const [errorCodigo, setErrorCodigo] = useState(null);
  // USE STATE
  const [errorsItems, setErrorsItems] = useState(null);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (datos) => {
    // verificando existencia de productos generar la entrada
    if (productoEntrada.length === 0)
      setErrorsItems('no hay productos agregados');
    else {
      let total = 0;
      productoEntrada.forEach((a) => (total += parseInt(a.Cantidad)));

      datos = { ...datos, CantidadProductos: total };
      dispatch(createEntradas({ datos, productoEntrada, IdAlmacenes }));
      handleClose();
    }
  };

  const VerificarCorrectoCodigo = (e) => {
    errorCodigo !== null && setErrorCodigo(null);
    const exist = entradas.some(
      (entra) =>
        entra.NumeroDocumento.toLowerCase() === e.target.value.toLowerCase()
    );
    exist && setErrorCodigo('Codigo Existente');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography textAlign='center' variant='h1'>
        Nueva Entrada
      </Typography>
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Codigo Documento
        </InputLabel>

        <Input
          type='text'
          {...register('NumeroDocumento', {
            required: true,
            onChange: VerificarCorrectoCodigo,
          })}
          name='NumeroDocumento'
        />
        {errors.NumeroDocumento?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
        {errorCodigo && <BoxError>{errorCodigo} </BoxError>}
      </Box>
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Usuario
        </InputLabel>
        <NativeSelect
          {...register('IdUsuario', {
            required: true,
          })}
        >
          <option aria-label='None' value='' />
          {usuarios.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.FullName}
            </option>
          ))}
        </NativeSelect>
        {errors.IdUsuario?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
      </Box>

      <Box>
        <TextArea
          sx={{ my: '2rem' }}
          aria-label='empty textarea'
          placeholder='Razón del ingreso'
          type='input'
          maxRows={3}
          {...register('razonEntrada', {
            required: 'true',
            max: 255,
          })}
        />
        {errors.razonEntrada?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
        {errors.razonEntrada?.type === 'max' && (
          <BoxError>Maximo 255 Caracteres</BoxError>
        )}
      </Box>

      <hr />
      <FormNuevoProductoEntrada
        errorsItems={errorsItems}
        setErrorsItems={setErrorsItems}
      />
      <hr />
      {errorsItems && <BoxError>{errorsItems}</BoxError>}
      <Button type='submit'>Crear</Button>
    </form>
  );
}
