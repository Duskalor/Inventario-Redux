import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getUsuarios = createAsyncThunk('get/getUsuarios', async () => {
  const { data } = await apiSistema.get('user');
  return data;
});
export const createUsuarios = createAsyncThunk(
  'create/postUsuarios',
  async (nuevo) => {
    const { data } = await apiSistema.post('user/create', nuevo);
    return data;
  }
);
export const deleteUsuarios = createAsyncThunk(
  'delete/postUsuarios',
  async (id) => {
    const { data } = await apiSistema.delete(`user/delete/${id}`);
    return data;
  }
);
export const updateUsuarios = createAsyncThunk(
  'update/postUsuarios',
  async ({
    id,
    FullName,
    email,
    Usuario,
    password,
    password_confirmation,
    IdPermisos,
  }) => {
    const { data } = await apiSistema.put(`user/update/${id}`, {
      FullName,
      email,
      Usuario,
      IdPermisos,
    });
    return data;
  }
);

export const UsuariosSlice = createSlice({
  name: 'Usuarios',
  initialState: {
    usuarios: [],
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
    [getUsuarios.pending]: (state) => {
      state.loading = true;
    },
    [getUsuarios.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.usuarios = payload.ListaUsuarios;
    },
    [getUsuarios.rejected]: (state) => {
      state.loading = false;
    },
    //CREATE
    [createUsuarios.pending]: (state) => {
      state.loading = true;
    },
    [createUsuarios.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.usuarios = payload.ListaUsuarios;
    },
    [createUsuarios.rejected]: (state) => {
      state.loading = false;
    },
    //DELETE
    [deleteUsuarios.pending]: (state) => {
      state.loading = true;
    },
    [deleteUsuarios.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.usuarios = payload.ListaUsuarios;
    },
    [deleteUsuarios.rejected]: (state) => {
      state.loading = false;
    },

    //UPDATE
    [updateUsuarios.pending]: (state) => {
      state.loading = true;
    },
    [updateUsuarios.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.usuarios = payload.ListaUsuarios;
    },
    [updateUsuarios.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = UsuariosSlice.actions;
