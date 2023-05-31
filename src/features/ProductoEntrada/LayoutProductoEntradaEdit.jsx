import { Button, Input, InputLabel, NativeSelect } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductoEntradaEdit from './ProductoEntradaEdit';
import { GuardarDatos, GuardarEstadoEdit } from './productoEntradaSlice';

export default function LayoutProductoEntradaEdit({ id }) {
  const { productos } = useSelector((state) => state.Productos);
  const { productoEntradaEdit, productoEntradaBD } = useSelector(
    (state) => state.ProductoEntrada
  );

  const datos = productoEntradaBD.filter((pro) => pro.IdEntrada === id);
  // console.log(datos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GuardarDatos(datos));
  }, [dispatch]);

  //console.log(productos);
  const [productosAgregados, setProductosAgregados] = useState({
    IdProducto: '',
    PrecioCompra: '',
    Cantidad: '',
    SubTotal: '',
  });
  //console.log(productos);
  const Guardar = (e) => {
    //console.log(e);
    setProductosAgregados({
      ...productosAgregados,
      [e.target.name]: e.target.value,
    });
  };
  const onSave = (e) => {
    const newProducto = structuredClone(productosAgregados);
    newProducto.SubTotal = newProducto.Cantidad * newProducto.PrecioCompra;

    const Verificar = productoEntradaEdit.find(
      (pro) => pro.IdProducto === newProducto.IdProducto
    );
    newProducto.IdEntrada = id;
    newProducto.PrecioCompra = newProducto.PrecioCompra + '.00';
    newProducto.SubTotal = newProducto.SubTotal + '.00';

    console.log(productoEntradaEdit, newProducto);
    if (
      newProducto.PrecioCompra !== '' &&
      newProducto.Cantidad !== '' &&
      newProducto.IdProducto !== ''
    ) {
      if (!Verificar) {
        dispatch(GuardarEstadoEdit(newProducto));
      }
    }

    setProductosAgregados({
      IdProducto: '',
      PrecioCompra: '',
      Cantidad: '',
      SubTotal: '',
    });
  };

  return (
    <>
      <div>
        <NativeSelect onChange={(e) => Guardar(e)} name='IdProducto'>
          <option aria-label='None' value='' />
          {productos.map((producto) => {
            return (
              <option key={producto.id} value={producto.id}>
                {producto.Codigo} : {producto.Descripcion}
              </option>
            );
          })}
        </NativeSelect>
      </div>
      <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Precio Compra
        </InputLabel>
        <Input
          type='number'
          name='PrecioCompra'
          value={productosAgregados.PrecioCompra}
          onChange={(e) => Guardar(e)}
        />
      </div>
      <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Cantidad
        </InputLabel>
        <Input
          type='number'
          name='Cantidad'
          value={productosAgregados.Cantidad}
          onChange={(e) => Guardar(e)}
        />
      </div>
      <Button onClick={(e) => onSave(e)}>Agregar</Button>
      <hr />
      <ProductoEntradaEdit />
    </>
  );
}
