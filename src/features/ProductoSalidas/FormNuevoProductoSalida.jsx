import {
  Autocomplete,
  Button,
  Input,
  InputLabel,
  NativeSelect,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductosEntradaDatosLocal from './ProductosSalidaDatosLocal';
import { GuardarEstado } from './productosSalidaSlice';

export default function FormNuevoProductoSalida() {
  const { productos } = useSelector((state) => state.Productos);
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);
  const dispatch = useDispatch();
  //console.log(productos);
  const [productosAgregados, setProductosAgregados] = useState({
    IdProducto: '',
    PrecioVenta: '',
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
    productosAgregados.SubTotal =
      productosAgregados.Cantidad * productosAgregados.PrecioVenta;
    const Verificar = productoEntrada.find(
      (pro) => pro.IdProducto === productosAgregados.IdProducto
    );
    if (
      productosAgregados.PrecioVenta &&
      productosAgregados.Cantidad &&
      productosAgregados.IdProducto
    ) {
      if (!Verificar) dispatch(GuardarEstado(productosAgregados));
    }

    //console.log(productosAgregados);
    setProductosAgregados({
      IdProducto: '',
      PrecioVenta: '',
      Cantidad: '',
      SubTotal: '',
    });
  };

  // const handleTag = ({ target }, fieldName) => {
  //   const { value } = target;
  //   //console.log(fieldName, value[0]);
  //   setProductosAgregados({
  //     ...productosAgregados,
  //     [fieldName]: value[0],
  //   });
  // };

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
          Precio Venta
        </InputLabel>
        <Input
          type='number'
          name='PrecioVenta'
          value={productosAgregados.PrecioVenta}
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
