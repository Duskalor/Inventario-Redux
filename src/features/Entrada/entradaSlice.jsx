import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getEntradas = createAsyncThunk('get/getEntradas', async () => {
  const { data } = await apiSistema.get('entrada');
  return data;
});
export const createEntradas = createAsyncThunk(
  'create/postEntradas',
  async (nuevo) => {
    console.log(nuevo);
    const { data } = await apiSistema.post('entrada/create', nuevo);
    return data;
  }
);
export const deleteEntradas = createAsyncThunk(
  'delete/postEntradas',
  async (id) => {
    const { data } = await apiSistema.delete(`entrada/delete/${id}`);
    return data;
  }
);
export const updateEntradas = createAsyncThunk(
  'update/postEntradas',
  async ({ id, FullName, Dni }) => {
    const { data } = await apiSistema.put(`entrada/update/${id}`, {
      FullName,
      Dni,
    });
    return data;
  }
);

export const entradaSlice = createSlice({
  name: 'Entradas',
  initialState: {
    entradas: [],
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
    [getEntradas.pending]: (state) => {
      state.loading = true;
    },
    [getEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.entradas = payload.ListaEntradas;
    },
    [getEntradas.rejected]: (state) => {
      state.loading = false;
    },
    //CREATE
    [createEntradas.pending]: (state) => {
      state.loading = true;
    },
    [createEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.entradas = payload.ListaEntradas;
      state.id = payload.Entrada.id;
    },
    [createEntradas.rejected]: (state) => {
      state.loading = false;
    },
    //DELETE
    [deleteEntradas.pending]: (state) => {
      state.loading = true;
    },
    [deleteEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entradas = payload.ListaEntradas;
    },
    [deleteEntradas.rejected]: (state) => {
      state.loading = false;
    },

    //UPDATE
    [updateEntradas.pending]: (state) => {
      state.loading = true;
    },
    [updateEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entradas = payload.ListaEntradas;
    },
    [updateEntradas.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = entradaSlice.actions;
