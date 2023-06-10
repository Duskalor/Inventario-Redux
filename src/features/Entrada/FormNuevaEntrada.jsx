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
export default function FormNuevaEntrada({ handleClose }) {
  const { usuarios } = useSelector((state) => state.Usuarios);
  const TextArea = EmptyTextarea();
  // const { proveedores } = useSelector((state) => state.Proveedor);
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);

  // USE STATE

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (datos) => {
    // verificando existencia de productos generar la entrada
    if (productoEntrada.length !== 0) {
      //   let Precio = 0;
      //   productoEntrada.forEach((a) => (Precio += parseInt(a.SubTotal)));
      //   datos = { ...datos, MontoTotal: Precio };

      let total = 0;
      productoEntrada.forEach((a) => (total += parseInt(a.Cantidad)));
      datos = { ...datos, CantidadProductos: total };
      dispatch(createEntradas({ datos, productoEntrada }));
      handleClose();
    }
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
          })}
          name='NumeroDocumento'
        />
        {errors.NumeroDocumento?.type === 'required' && (
          <BoxError>El Campo es requirido </BoxError>
        )}
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
          {usuarios.map((usuario) => {
            return (
              <option key={usuario.id} value={usuario.id}>
                {usuario.FullName}
              </option>
            );
          })}
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
          {...register('razonSalida')}
        />
      </Box>
      {/*       
      <Box>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Proveedor
        </InputLabel>
        <NativeSelect {...register('IdProveedor', { required: true })}>
          <option aria-label='None' value='' />
          {proveedores.map((proveedor) => {
            return (
              <option key={proveedor.id} value={proveedor.id}>
                {proveedor.FullName}
              </option>
            );
          })}
        </NativeSelect>
        {errors.IdProveedor?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </Box> */}

      <hr />
      <FormNuevoProductoEntrada />
      <hr />
      <Button type='submit'>Crear</Button>
    </form>
  );
}
