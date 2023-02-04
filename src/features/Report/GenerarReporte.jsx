import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos } from '../Productos/productosSlice';
import { getEntradas } from '../Entrada/entradaSlice';
import { getSalidas } from '../Salidas/salidasSlice';
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function GenerarReporte({ handleClose }) {
  var { productos } = useSelector((state) => state.Productos);
  const { entradas } = useSelector((state) => state.Entrada);
  const { salidas } = useSelector((state) => state.Salida);
  const { usuarios } = useSelector((state) => state.Usuarios);
  const { proveedores } = useSelector((state) => state.Proveedor);
  const { clientes } = useSelector((state) => state.Clientes);
  const dispatch = useDispatch();
  const [error, seterror] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //console.log(DatosReports);
  useEffect(() => {
    if (productos.length === 0) {
      dispatch(getProductos());
    }
    if (entradas.length === 0) {
      dispatch(getEntradas());
    }
    if (salidas.length === 0) {
      dispatch(getSalidas());
    }
  }, [dispatch]);

  const onSubmit = (dato) => {
    seterror(false);
    console.log(dato);
    var data = [];

    var otro = [];
    if (dato.OpcionEoS === 'Entrada') {
      data = [...entradas];
      otro = [...proveedores];
    } else {
      data = [...salidas];
      otro = [...clientes];
    }

    let ValorFecha = null;
    let Reporte = null;
    switch (dato.OpcionsFecha) {
      case 'Day':
        ValorFecha = 10;
        Reporte = data.filter(
          (entra) => entra.created_at?.slice(0, ValorFecha) == dato.Fecha
        );
        break;
      case 'Month':
        ValorFecha = 7;
        Reporte = data.filter(
          (entra) =>
            entra.created_at?.slice(0, ValorFecha) ==
            dato.Fecha.slice(0, ValorFecha)
        );
        break;
      case 'Year':
        ValorFecha = 4;
        Reporte = data.filter(
          (entra) =>
            entra.created_at?.slice(0, ValorFecha) ==
            dato.Fecha.slice(0, ValorFecha)
        );

        break;
    }

    //console.log(Reporte);
    //console.log(data, IdAusar, otro);

    const AEA = [];
    if (dato.OpcionEoS === 'Entrada') {
      Reporte.map((report) => {
        let aMostrar = [];
        const user = usuarios.find((u) => u.id == report.IdUsuario);
        const proveedor = otro.find((u) => u.id == report.IdProveedor);

        aMostrar = {
          ...aMostrar,
          NumeroDocumento: report.NumeroDocumento,
          Usuario: user.FullName,
          Cantidad_Productos: report.CantidadProductos,
          Proveedor: proveedor.FullName,
          Fecha_Creado: report.created_at,
          Fecha_Actualizado: report.updated_at,
        };
        AEA.push(aMostrar);
      });
    } else {
      Reporte.map((report) => {
        let aMostrar = [];
        const user = usuarios.find((u) => u.id == report.IdUsuario);
        const cliente = otro.find((u) => u.id == report.IdCliente);

        aMostrar = {
          ...aMostrar,
          NumeroDocumento: report.NumeroDocumento,
          Usuario: user.FullName,
          Cantidad_Productos: report.CantidadProductos,
          Clientes: cliente.FullName,
          Dni: cliente.Dni,
          Fecha_Creado: report.created_at,
          Fecha_Actualizado: report.updated_at,
        };
        AEA.push(aMostrar);
      });
    }

    console.log(AEA);
    if (AEA.length != 0) {
      seterror(false);
      var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(AEA);
      XLSX.utils.book_append_sheet(wb, ws, `${dato.OpcionEoS}s`);
      XLSX.writeFile(
        wb,
        `Report-${dato.Fecha}-${dato.OpcionEoS}s-${dato.OpcionsFecha}.xlsx`
      );
      console.log(dato);
    } else {
      seterror(true);
    }
  };

  return (
    <>
      <h1>REPORTES</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('Fecha')}
          id='date'
          label='Fecha'
          type='date'
          defaultValue={new Date().toISOString().slice(0, 10)}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <hr />
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>
            Opciones de Filtrado
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='Day'
            name='radio-buttons-group'
          >
            <FormControlLabel
              {...register('OpcionsFecha')}
              value='Day'
              control={<Radio />}
              label='Dia'
            />
            <FormControlLabel
              {...register('OpcionsFecha')}
              value='Month'
              control={<Radio />}
              label='Mes'
            />
            <FormControlLabel
              {...register('OpcionsFecha')}
              value='Year'
              control={<Radio />}
              label='Año'
            />
          </RadioGroup>
        </FormControl>
        <hr />
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>
            Opciones de Reporte
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue='Entrada'
            name='radio-buttons-group'
          >
            <FormControlLabel
              {...register('OpcionEoS')}
              value='Entrada'
              control={<Radio />}
              label='Entrada'
            />
            <FormControlLabel
              {...register('OpcionEoS')}
              value='Salida'
              control={<Radio />}
              label='Salida'
            />
          </RadioGroup>
        </FormControl>
        <hr />
        {error ? <h3>'No hay Datos en esa Fecha'</h3> : ''}

        <Button type='submit'>Generar</Button>
        <Button onClick={() => handleClose(false)}>Cerrar</Button>
      </form>
    </>
  );
}
