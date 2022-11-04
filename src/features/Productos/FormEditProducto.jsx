import { Button, Input } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductos } from './productosSlice';

export default function FormEditProducto({ handleClose, id }) {
  const dispatch = useDispatch();
  //console.log(id);
  const { productos } = useSelector((state) => state.Productos);

  const { Codigo, Categoria, Descripcion, PrecioCompra, PrecioVenta, Stock } =
    productos.find((producto) => producto.id === id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      Categoria: Categoria,
      Descripcion: Descripcion,
      PrecioCompra: PrecioCompra,
      PrecioVenta: PrecioVenta,
      Stock: Stock,
    },
  });
  const onSubmit = (dato) => {
    const { Categoria, Descripcion, PrecioCompra, PrecioVenta, Stock } = dato;
    dispatch(
      updateProductos({
        id,
        Categoria,
        Descripcion,
        PrecioCompra,
        PrecioVenta,
        Stock,
      })
    );
    handleClose();
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Codigo</label>
        <Input type='text' value={Codigo} />
      </div>
      <div>
        <label>Descripcion</label>
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
        <label>Categoria</label>
        <Input
          type='text'
          {...register('Categoria', {
            required: true,
          })}
        />
        {errors.Categoria?.type === 'required' && <p>El Campo es requirido </p>}
      </div>
      <div>
        <label>PrecioCompra</label>
        <Input
          type='number'
          {...register('PrecioCompra', {
            required: true,
          })}
        />
        {errors.PrecioCompra?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>
      <div>
        <label>PrecioVenta</label>
        <Input
          type='number'
          {...register('PrecioVenta', {
            required: true,
          })}
        />
        {errors.PrecioVenta?.type === 'required' && (
          <p>El Campo es requirido </p>
        )}
      </div>
      <div>
        <label>Stock</label>
        <Input
          type='number'
          {...register('Stock', {
            required: true,
          })}
        />
        {errors.Stock?.type === 'required' && <p>El Campo es requirido </p>}
      </div>

      <Button type='submit'>Guardar</Button>
    </form>
  );
}