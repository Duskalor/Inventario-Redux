import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getProveedor = createAsyncThunk('get/getProveedor', async () => {
  const { data } = await apiSistema.get('proveedor');
  return data;
});
export const createProveedor = createAsyncThunk(
  'create/postProveedor',
  async (nuevo) => {
    const { data } = await apiSistema.post('proveedor/create', nuevo);
    return data;
  }
);
export const deleteProveedor = createAsyncThunk(
  'delete/postProveedor',
  async (id) => {
    const { data } = await apiSistema.delete(`proveedor/delete/${id}`);
    return data;
  }
);
export const updateProveedor = createAsyncThunk(
  'update/postProveedor',
  async ({ id, FullName, Ruc }) => {
    const { data } = await apiSistema.put(`proveedor/update/${id}`, {
      FullName,
      Ruc,
    });
    return data;
  }
);

export const ProveedorSlice = createSlice({
  name: 'Proveedor',
  initialState: {
    proveedores: [],
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
    [getProveedor.pending]: (state) => {
      state.loading = true;
    },
    [getProveedor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.proveedores = payload.ListaDeproveedores;
    },
    [getProveedor.rejected]: (state) => {
      state.loading = false;
    },
    //CREATE
    [createProveedor.pending]: (state) => {
      state.loading = true;
    },
    [createProveedor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.proveedores = payload.ListaDeproveedores;
    },
    [createProveedor.rejected]: (state) => {
      state.loading = false;
    },
    //DELETE
    [deleteProveedor.pending]: (state) => {
      state.loading = true;
    },
    [deleteProveedor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.proveedores = payload.ListaDeproveedores;
    },
    [deleteProveedor.rejected]: (state) => {
      state.loading = false;
    },

    //UPDATE
    [updateProveedor.pending]: (state) => {
      state.loading = true;
    },
    [updateProveedor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.proveedores = payload.ListaDeproveedores;
    },
    [updateProveedor.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = ProveedorSlice.actions;
