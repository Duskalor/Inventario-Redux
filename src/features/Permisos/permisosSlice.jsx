import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getpermisos = createAsyncThunk(
  'get/getpermisos',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('permisos', config);
    //console.log(data);
    return data;
  }
);
export const createpermisos = createAsyncThunk(
  'create/postpermisos',
  async (nuevo, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post('permisos/create', nuevo, config);
    return data;
  }
);
export const deletepermisos = createAsyncThunk(
  'delete/postpermisos',
  async (id, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.delete(`permisos/delete/${id}`, config);
    return data;
  }
);
export const updatepermisos = createAsyncThunk(
  'update/postpermisos',
  async ({ id, dato }, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const {
      Descripcion,
      Clientes,
      Configuracion,
      Entradas,
      Permisos,
      Productos,
      Proveedores,
      Salidas,
      Usuarios,
    } = dato;
    const { data } = await apiSistema.put(
      `permisos/update/${id}`,
      {
        Descripcion,
        Clientes,
        Configuracion,
        Entradas,
        Permisos,
        Productos,
        Proveedores,
        Salidas,
        Usuarios,
      },
      config
    );
    //console.log(data);
    return data;
  }
);

export const permisosSlice = createSlice({
  name: 'Permisos',
  initialState: {
    permisos: [],
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
    [getpermisos.pending]: (state) => {
      state.loading = true;
    },
    [getpermisos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.permisos = payload.Listapermisos;
    },
    [getpermisos.rejected]: (state) => {
      state.loading = false;
    },
    //CREATE
    [createpermisos.pending]: (state) => {
      state.loading = true;
    },
    [createpermisos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.permisos = payload.Listapermisos;
    },
    [createpermisos.rejected]: (state) => {
      state.loading = false;
    },
    //DELETE
    [deletepermisos.pending]: (state) => {
      state.loading = true;
    },
    [deletepermisos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.permisos = payload.Listapermisos;
    },
    [deletepermisos.rejected]: (state) => {
      state.loading = false;
    },

    //UPDATE
    [updatepermisos.pending]: (state) => {
      state.loading = true;
    },
    [updatepermisos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.permisos = payload.Listapermisos;
    },
    [updatepermisos.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = permisosSlice.actions;
