import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';
import {
  BorrarEstadoEdit,
  createProductoEntrada,
  getDetalleEntradas,
} from '../ProductoEntrada/productoEntradaSlice';
import {
  borrarProductos,
  getProductos,
  updateProductos,
} from '../Productos/productosSlice';
import { getSalidas } from '../Salidas/salidasSlice';

export const getEntradas = createAsyncThunk('get/getEntradas', async () => {
  const { data } = await apiSistema.get('entrada');
  return data;
});

export const createEntradas = createAsyncThunk(
  'create/postEntradas',
  async ({ datos, productoEntrada, productos }, { dispatch }) => {
    //console.log(productoEntrada);

    const { data } = await apiSistema.post('entrada/create', datos);
    const IdEntrada = data.Entrada.id;
    //console.log(data);
    productoEntrada.map((pe) => {
      dispatch(createProductoEntrada({ IdEntrada, pe }));
      const ParaAgregar = productos.find((pro) => pro.id == pe.IdProducto);
      const pro = { ...ParaAgregar };
      pro.Stock = pro.Stock + parseInt(pe.Cantidad);
      dispatch(updateProductos(pro));
      console.log(pro);
    });
    dispatch(getDetalleEntradas());
    dispatch(borrarProductos());
    dispatch(getProductos());
    dispatch(BorrarEstadoEdit());

    return data;
  }
);
export const deleteEntradas = createAsyncThunk(
  'delete/postEntradas',
  async (id) => {
    const { data } = await apiSistema.delete(`entrada/delete/${id}`);
    return data;
  }
);
export const updateEntradas = createAsyncThunk(
  'update/postEntradas',
  async (
    { id, CantidadProductos, IdProveedor, IdUsuario, MontoTotal },
    { dispatch }
  ) => {
    //console.log({ id, CantidadProductos, IdProveedor, IdUsuario, MontoTotal });
    const { data } = await apiSistema.put(`entrada/update/${id}`, {
      IdUsuario,
      IdProveedor,
      CantidadProductos,
      MontoTotal,
    });
    dispatch(BorrarEstadoEdit());
    dispatch(getDetalleEntradas());

    return data;
  }
);

export const entradaSlice = createSlice({
  name: 'Entradas',
  initialState: {
    entradas: [],
    id: null,
    error: false,
    loading: false,
  },
  reducers: {
    borrarEntrada: (state, payload) => {
      // console.log(payload);
      state.entradas = [];
    },
  },
  extraReducers: {
    ///GET
    [getEntradas.pending]: (state) => {
      state.loading = true;
    },
    [getEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.entradas = payload.ListaEntradas.reverse();
    },
    [getEntradas.rejected]: (state) => {
      state.loading = false;
    },
    //CREATE
    [createEntradas.pending]: (state) => {
      state.loading = true;
    },
    [createEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.entradas = payload.ListaEntradas;
      state.id = payload.Entrada.id;
    },
    [createEntradas.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.error);
    },
    //DELETE
    [deleteEntradas.pending]: (state) => {
      state.loading = true;
    },
    [deleteEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entradas = payload.ListaEntradas;
    },
    [deleteEntradas.rejected]: (state) => {
      state.loading = false;
    },

    //UPDATE
    [updateEntradas.pending]: (state) => {
      state.loading = true;
    },
    [updateEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entradas = payload.ListaEntradas;
    },
    [updateEntradas.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { borrarEntrada } = entradaSlice.actions;
