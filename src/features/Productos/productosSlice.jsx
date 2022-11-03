import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getProductos = createAsyncThunk('get/getProductos', async () => {
  const { data } = await apiSistema.get('producto');
  return data;
});
export const productosSlice = createSlice({
  name: 'Productos',
  initialState: {
    productos: [],
    error: null,
    loading: false,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },
  extraReducers: {
    [getProductos.pending]: (state) => {
      state.loading = true;
    },
    [getProductos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productos = payload.ListaProductos;
    },
    [getProductos.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = productosSlice.actions;
