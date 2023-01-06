import {
  Autocomplete,
  Button,
  Input,
  InputLabel,
  NativeSelect,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductoEntradaEdit from './ProductoEntradaEdit';
import { GuardarDatos, GuardarEstadoEdit } from './productoEntradaSlice';

export default function LayoutProductoEntradaEdit({ id }) {
  const { productos } = useSelector((state) => state.Productos);
  const { productoEntradaEdit, productoEntradaBD } = useSelector(
    (state) => state.ProductoEntrada
  );

  const datos = productoEntradaBD.filter((pro) => pro.IdEntrada == id);
  //console.log(datos);

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
    productosAgregados.SubTotal =
      productosAgregados.Cantidad * productosAgregados.PrecioCompra;
    const Verificar = productoEntradaEdit.find(
      (pro) => pro.IdProducto === productosAgregados.IdProducto
    );
    productosAgregados.IdEntrada = id;
    productosAgregados.PrecioCompra = productosAgregados.PrecioCompra + '.00';
    productosAgregados.SubTotal = productosAgregados.SubTotal + '.00';

    //console.log(productosAgregados);
    if (
      productosAgregados.PrecioCompra &&
      productosAgregados.Cantidad &&
      productosAgregados.IdProducto
      // productosAgregados.Cantidad > 0 &&
      // productosAgregados.PrecioCompra > 0
    ) {
      if (!Verificar) {
        dispatch(GuardarEstadoEdit(productosAgregados));
      }
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
      <ProductoEntradaEdit />
    </>
  );
}
