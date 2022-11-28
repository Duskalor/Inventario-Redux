import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getClientes = createAsyncThunk(
  'get/getClientes',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('cliente', config);
    //console.log(data);
    return data;
  }
);
export const createClientes = createAsyncThunk(
  'create/postClientes',
  async (nuevo, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post('cliente/create', nuevo, config);
    return data;
  }
);
export const deleteClientes = createAsyncThunk(
  'delete/postClientes',
  async (id, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.delete(`cliente/delete/${id}`, config);
    return data;
  }
);
export const updateClientes = createAsyncThunk(
  'update/postClientes',
  async ({ id, FullName, Dni }, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.put(
      `cliente/update/${id}`,
      {
        FullName,
        Dni,
      },
      config
    );
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
