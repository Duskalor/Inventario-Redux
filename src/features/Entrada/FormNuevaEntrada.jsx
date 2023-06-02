import { Button, Input, InputLabel, NativeSelect } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FormNuevoProductoEntrada from '../ProductoEntrada/FormNuevoProductoEntrada';
import { createEntradas } from './entradaSlice';

export default function FormNuevaEntrada({ handleClose }) {
  const { usuarios } = useSelector((state) => state.Usuarios);
  const { proveedores } = useSelector((state) => state.Proveedor);
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);

  // USE STATE

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (datos) => {
    // console.log({ productoEntrada });
    // verificando existencia de productos generar la entrada
    if (productoEntrada.length !== 0) {
      let total = 0;
      productoEntrada.forEach((a) => (total += parseInt(a.Cantidad)));
      let Precio = 0;
      productoEntrada.forEach((a) => (Precio += parseInt(a.SubTotal)));

      datos = { ...datos, CantidadProductos: total };
      datos = { ...datos, MontoTotal: Precio };
      dispatch(createEntradas({ datos, productoEntrada }));
      handleClose();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Nueva Entrada</h1>
      <div>
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
          <p>El Campo es requirido </p>
        )}
      </div>
      <div>
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
        {errors.IdUsuario?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
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
      </div>

      <hr />
      <FormNuevoProductoEntrada />
      <hr />
      <Button type='submit'>Crear</Button>
    </form>
  );
}
