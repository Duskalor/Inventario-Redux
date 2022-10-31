import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getClientes = createAsyncThunk('get/getClientes', async () => {
  const { data } = await apiSistema.get('cliente');
  return data;
});
export const createClientes = createAsyncThunk(
  'create/postClientes',
  async (nuevo) => {
    const { data } = await apiSistema.post('cliente/create', nuevo);
    return data;
  }
);

export const deleteClientes = createAsyncThunk(
  'delete/postClientes',
  async (id) => {
    const { data } = await apiSistema.delete(`cliente/delete/${id}`);
    return data;
  }
);

export const ClientesSlice = createSlice({
  name: 'Clientes',
  initialState: {
    clientes: [],
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
    [getClientes.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getClientes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clientes = payload.ListaDeclientes;
    },
    [getClientes.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    //CREATE
    [createClientes.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [createClientes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clientes = payload.ListaDeclientes;
    },
    [createClientes.rejected]: (state, { payload }) => {
      state.loading = false;
    },
    //DELETE
    [deleteClientes.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [deleteClientes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clientes = payload.ListaDeclientes;
    },
    [deleteClientes.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});
export const { increment } = ClientesSlice.actions;
