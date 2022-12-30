import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getSalidas = createAsyncThunk('get/getSalidas', async () => {
  const { data } = await apiSistema.get('salida');
  return data;
});
export const createSalida = createAsyncThunk(
  'create/postSalidas',
  async (nuevo) => {
    //console.log(nuevo);
    const { data } = await apiSistema.post('salida/create', nuevo);
    return data;
  }
);
export const deleteSalidas = createAsyncThunk(
  'delete/postEntradas',
  async (id) => {
    const { data } = await apiSistema.delete(`salida/delete/${id}`);
    return data;
  }
);

export const salidasSlice = createSlice({
  name: 'Salidas',
  initialState: {
    salidas: [],
    id: null,
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
    [getSalidas.pending]: (state) => {
      state.loading = true;
    },
    [getSalidas.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.salidas = payload.ListaSalidas;
    },
    [getSalidas.rejected]: (state) => {
      state.loading = false;
    },
    //CREATE
    [createSalida.pending]: (state) => {
      state.loading = true;
    },
    [createSalida.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.salidas = payload.ListaSalidas;
      state.id = payload.Salida.id;
    },
    [createSalida.rejected]: (state) => {
      state.loading = false;
    },
    //DELETE
    [deleteSalidas.pending]: (state) => {
      state.loading = true;
    },
    [deleteSalidas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.salidas = payload.ListaSalidas;
    },
    [deleteSalidas.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = salidasSlice.actions;
