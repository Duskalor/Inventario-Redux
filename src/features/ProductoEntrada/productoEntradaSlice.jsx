import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getDetalleEntradas = createAsyncThunk(
  'get/getDetalleEntradas',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('detalleEntrada', config);
    //console.log(data);
    return data;
  }
);
export const createProductoEntrada = createAsyncThunk(
  'create/postProductoEntrada',
  async (nuevo, { getState }) => {
    const { Auth } = getState();
    //console.log(nuevo);
    const { IdEntrada } = nuevo;
    const { IdProducto, PrecioCompra, Cantidad, SubTotal } = nuevo.pe;
    //console.log(IdEntrada, IdProducto, PrecioCompra, Cantidad, SubTotal);
    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post(
      'detalleEntrada/create',
      { IdEntrada, IdProducto, PrecioCompra, Cantidad, SubTotal },
      config
    );
    return data;
  }
);
// export const deleteUsuarios = createAsyncThunk(
//   'delete/postUsuarios',
//   async (id, { getState }) => {
//     const { Auth } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${Auth.userToken}`,
//       },
//     };
//     const { data } = await apiSistema.delete(`user/delete/${id}`, config);
//     return data;
//   }
// );
// export const updateProductoEntrada = createAsyncThunk(
//   'update/postUsuarios',
//   async ({ id, FullName, email, Usuario, IdPermisos }, { getState }) => {
//     const { Auth } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${Auth.userToken}`,
//       },
//     };
//     const { data } = await apiSistema.put(
//       `user/update/${id}`,
//       {
//         FullName,
//         email,
//         Usuario,
//         IdPermisos,
//       },
//       config
//     );
//     return data;
//   }
// );

export const productoEntradaSlice = createSlice({
  name: 'ProductoEntrada',
  initialState: {
    productoEntradaBD: [],
    productoEntrada: [],
    error: null,
    loading: false,
  },
  reducers: {
    GuardarEstado: (state, { payload }) => {
      //console.log(payload);
      if (!payload.IdProducto == '') {
        state.productoEntrada = [...state.productoEntrada, payload];
      }
    },
    borrarEstado: (state) => {
      //console.log(payload);
      state.productoEntrada = [];
    },
    borrarItem: (state, { payload }) => {
      console.log(payload);
      state.productoEntrada = state.productoEntrada.filter(
        (item) => item.IdProducto !== payload
      );
      console.log(state.productoEntrada);
    },
  },
  extraReducers: {
    ///GET
    [getDetalleEntradas.pending]: (state) => {
      state.loading = true;
    },
    [getDetalleEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      //console.log(payload);
      state.productoEntradaBD = payload.ListaDetalleEntrada;
    },
    [getDetalleEntradas.rejected]: (state) => {
      state.loading = false;
    },
    [createProductoEntrada.pending]: (state) => {
      state.loading = true;
    },
    [createProductoEntrada.fulfilled]: (state, action) => {
      state.loading = false;
      //console.log(action);
    },
    [createProductoEntrada.rejected]: (state, action) => {
      state.loading = false;
      //console.log(action);
    },
  },
});
export const { GuardarEstado, borrarEstado, borrarItem } =
  productoEntradaSlice.actions;
