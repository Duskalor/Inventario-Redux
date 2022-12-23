import { Button, Input, InputLabel, NativeSelect } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import LayoutProductoEntradaEdit from '../ProductoEntrada/LayoutProductoEntradaEdit';
import ProductoEntradaEdit from '../ProductoEntrada/ProductoEntradaEdit';
import {
  BorrarEstadoEdit,
  createProductoEntrada,
  DeleteProductoEntrada,
  EditProductoEntrada,
  getDetalleEntradas,
  updateProductoEntrada,
} from '../ProductoEntrada/productoEntradaSlice';
import { getProductos } from '../Productos/productosSlice';
import { updateEntradas } from './entradaSlice';

export default function FormEditEntrada({ handleClose, id }) {
  const dispatch = useDispatch();
  //console.log(id);

  const { entradas } = useSelector((state) => state.Entrada);

  const {
    NumeroDocumento,
    CantidadProductos,
    IdProveedor,
    IdUsuario,
    MontoTotal,
    id: identrada,
  } = entradas.find((entra) => entra.id == id);

  const { usuarios } = useSelector((state) => state.Usuarios);
  const { proveedores } = useSelector((state) => state.Proveedor);
  const { productoEntradaBD } = useSelector((state) => state.ProductoEntrada);
  const { productoEntradaEdit } = useSelector((state) => state.ProductoEntrada);

  const ProDucEntra = productoEntradaBD.filter((pro) => pro.IdEntrada == id);
  //console.log(ProDucEntra);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      NumeroDocumento: NumeroDocumento,
      IdUsuario: IdUsuario,
      IdProveedor: IdProveedor,
      CantidadProductos: CantidadProductos,
      MontoTotal: MontoTotal,
    },
  });
  const onSubmit = (datos) => {
    if (!productoEntradaEdit.length == 0) {
      productoEntradaEdit.map((pe) => {
        const Existencia = ProDucEntra.find(
          (pro) => pro.IdProducto == pe.IdProducto
        );
        Existencia
          ? dispatch(updateProductoEntrada({ pe }))
          : dispatch(EditProductoEntrada({ pe }));
      });

      ProDucEntra.map((pe) => {
        const Existencia = productoEntradaEdit.find(
          (pro) => pro.IdProducto == pe.IdProducto
        );

        if (!Existencia) {
          dispatch(DeleteProductoEntrada(pe.id));
        }
      });

      datos.id = id;
      //console.log(datos);

      /////
      let total = 0;
      productoEntradaEdit.forEach(function (a) {
        total += parseInt(a.Cantidad);
      });
      let Precio = 0;
      productoEntradaEdit.forEach(function (a) {
        Precio += parseInt(a.SubTotal);
      });
      //console.log(productoEntradaEdit);
      datos = { ...datos, CantidadProductos: total };
      datos = { ...datos, MontoTotal: Precio };

      dispatch(updateEntradas(datos));
      dispatch(BorrarEstadoEdit());
      dispatch(getProductos());
      handleClose();
    }
    //console.log(datos);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>
          Codigo: <b>{NumeroDocumento}</b>
        </h2>
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
        <NativeSelect
          {...register('IdProveedor', {
            required: true,
          })}
        >
          {proveedores.map((Proveedor) => {
            return (
              <option key={Proveedor.id} value={Proveedor.id}>
                {Proveedor.FullName}
              </option>
            );
          })}
        </NativeSelect>
        {errors.IdProveedor?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>
      <hr />

      <LayoutProductoEntradaEdit id={identrada} />
      {/* <EditProductoEntrada CodigoProductos={ProDucEntra} /> */}
      <Button type='submit'>Guardar</Button>
    </form>
  );
}
