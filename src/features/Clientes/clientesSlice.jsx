import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getClientes = createAsyncThunk('get/getClientes', async () => {
  const { data } = await apiSistema.get('cliente');
  console.log(data);
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
export const updateClientes = createAsyncThunk(
  'update/postClientes',
  async ({ id, FullName, Dni }) => {
    const { data } = await apiSistema.put(`cliente/update/${id}`, {
      FullName,
      Dni,
    });
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
    [getClientes.pending]: (state) => {
      state.loading = true;
    },
    [getClientes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clientes = payload.ListaDeclientes;
    },
    [getClientes.rejected]: (state) => {
      state.loading = false;
    },
    //CREATE
    [createClientes.pending]: (state) => {
      state.loading = true;
    },
    [createClientes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clientes = payload.ListaDeclientes;
    },
    [createClientes.rejected]: (state) => {
      state.loading = false;
    },
    //DELETE
    [deleteClientes.pending]: (state) => {
      state.loading = true;
    },
    [deleteClientes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clientes = payload.ListaDeclientes;
    },
    [deleteClientes.rejected]: (state) => {
      state.loading = false;
    },

    //UPDATE
    [updateClientes.pending]: (state) => {
      state.loading = true;
    },
    [updateClientes.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.clientes = payload.ListaDeclientes;
    },
    [updateClientes.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = ClientesSlice.actions;
