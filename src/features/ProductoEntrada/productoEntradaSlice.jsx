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
// export const createUsuarios = createAsyncThunk(
//   'create/postUsuarios',
//   async (nuevo, { getState }) => {
//     const { Auth } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${Auth.userToken}`,
//       },
//     };
//     const { data } = await apiSistema.post('user/create', nuevo, config);
//     return data;
//   }
// );
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
    productoEntrada: [],
    error: null,
    loading: false,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
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
      state.productoEntrada = payload.ListaDetalleEntrada;
    },
    [getDetalleEntradas.rejected]: (state) => {
      state.loading = false;
    },
    // //CREATE
    // [createUsuarios.pending]: (state) => {
    //   state.loading = true;
    // },
    // [createUsuarios.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.usuarios = payload.ListaUsuarios;
    // },
    // [createUsuarios.rejected]: (state) => {
    //   state.loading = false;
    // },
    // //DELETE
    // [deleteUsuarios.pending]: (state) => {
    //   state.loading = true;
    // },
    // [deleteUsuarios.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.usuarios = payload.ListaUsuarios;
    // },
    // [deleteUsuarios.rejected]: (state) => {
    //   state.loading = false;
    // },

    // //UPDATE
    // [updateProductoEntrada.pending]: (state) => {
    //   state.loading = true;
    // },
    // [updateProductoEntrada.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.usuarios = payload.ListaUsuarios;
    // },
    // [updateProductoEntrada.rejected]: (state) => {
    //   state.loading = false;
    // },
  },
});
export const { increment } = productoEntradaSlice.actions;
