import { Button, Input, InputLabel, NativeSelect } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FormNuevoProductoSalida from '../ProductoSalidas/FormNuevoProductoSalida';
import { getDetalleSalida } from '../ProductoSalidas/productosSalidaSlice';
import { createSalida } from './salidasSlice';
// import FormNuevoProductoEntrada from '../ProductoEntrada/FormNuevoProductoEntrada';
// import { createEntradas } from './entradaSlice';

export default function FormNuevaSalida({ handleClose }) {
  const { usuarios } = useSelector((state) => state.Usuarios);
  const { clientes } = useSelector((state) => state.Clientes);
  const { productoSalida } = useSelector((state) => state.ProductoSalida);

  // USE STATE

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (datos) => {
    console.log(productoSalida.length);
    if (!productoSalida.length == 0) {
      let total = 0;
      productoSalida.forEach(function (a) {
        total += parseInt(a.Cantidad);
      });
      let Precio = 0;
      productoSalida.forEach(function (a) {
        Precio += parseInt(a.SubTotal);
      });

      datos = { ...datos, CantidadProductos: total };
      datos = { ...datos, MontoTotal: Precio };
      dispatch(createSalida(datos));
      dispatch(getDetalleSalida());
      handleClose();
      console.log(datos);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Nueva Venta</h1>
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
          Vendedor
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
          Cliente
        </InputLabel>
        <NativeSelect {...register('IdCliente', { required: true })}>
          <option aria-label='None' value='' />
          {clientes.map((cliente) => {
            return (
              <option key={cliente.id} value={cliente.id}>
                {cliente.FullName}
              </option>
            );
          })}
        </NativeSelect>
        {errors.IdProveedor?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>

      <hr />
      <FormNuevoProductoSalida />
      <hr />
      <Button type='submit'>Crear</Button>
    </form>
  );
}
