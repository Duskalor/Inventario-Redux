import { Button, Input, InputLabel, NativeSelect } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GuardarEstado } from './productoEntradaSlice';
import ProductosEntradaDatosLocal from './ProductosEntradaDatosLocal';

export default function FormNuevoProductoEntrada() {
  const { productos } = useSelector((state) => state.Productos);
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);
  const dispatch = useDispatch();
  const [productosAgregados, setProductosAgregados] = useState({
    IdProducto: '',
    PrecioCompra: '',
    Cantidad: '',
    SubTotal: '',
  });
  const Guardar = (e) => {
    setProductosAgregados({
      ...productosAgregados,
      [e.target.name]: e.target.value,
    });
  };
  const onSave = (e) => {
    // obtener el subtotal
    productosAgregados.SubTotal =
      productosAgregados.Cantidad * productosAgregados.PrecioCompra;
    // verficar existencia
    const Verificar = productoEntrada.some(
      (pro) => pro.IdProducto === productosAgregados.IdProducto
    );
    // console.log({ productosAgregados });
    //  console.log({ Verificar });

    // validando campos
    if (
      productosAgregados.PrecioCompra !== '' &&
      productosAgregados.Cantidad !== '' &&
      productosAgregados.IdProducto !== ''
    ) {
      // console.log('AQUI');
      if (!Verificar) dispatch(GuardarEstado(productosAgregados));
    }

    //console.log(productosAgregados);
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
      <ProductosEntradaDatosLocal />
    </>
  );
}
