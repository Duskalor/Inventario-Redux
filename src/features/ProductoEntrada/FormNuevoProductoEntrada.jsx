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
import { ChildModal } from '../Productos/LayoutProducto';
import { GuardarEstado } from './productoEntradaSlice';
import ProductosEntradaDatosLocal from './ProductosEntradaDatosLocal';

export default function FormNuevoProductoEntrada() {
  const { productos } = useSelector((state) => state.Productos);
  const { productoEntrada } = useSelector((state) => state.ProductoEntrada);
  const dispatch = useDispatch();
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
    productosAgregados.SubTotal =
      productosAgregados.Cantidad * productosAgregados.PrecioCompra;
    const Verificar = productoEntrada.find(
      (pro) => pro.IdProducto === productosAgregados.IdProducto
    );
    if (
      productosAgregados.PrecioCompra &&
      productosAgregados.Cantidad &&
      productosAgregados.IdProducto
    ) {
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
        {/* <Autocomplete
          onChange={(e, value) => {
            setProductosAgregados({ IdProducto: value.id });
          }}
          // onSelect={(event) => handleTag(event, 'IdProducto')}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          name='IdProducto'
          id='combo-box-demo'
          options={productos}
          sx={{ width: 400 }}
          renderInput={(params) => (
            <TextField {...params} label='Producto' variant='outlined' />
          )}
          getOptionLabel={(option) =>
            `${option.Codigo} : ${option.Descripcion}`
          }
          renderOption={(props, option) => {
            return (
              <div {...props}>
                {` ${option.Codigo} :  ${option.Descripcion}`}
              </div>
            );
          }}
        /> */}
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
      {/* <div>
        <InputLabel variant='standard' htmlFor='uncontrolled-native'>
          Proveedor
        </InputLabel>
        <NativeSelect
          {...register('IdProveedor', {
            required: true,
          })}
        >
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
      </div> */}
    </>
  );
}
