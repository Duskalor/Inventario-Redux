import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getpermisos = createAsyncThunk('get/getpermisos', async () => {
  const { data } = await apiSistema.get('permisos');
  //console.log(data);
  return data;
});
export const createpermisos = createAsyncThunk(
  'create/postpermisos',
  async (nuevo) => {
    const { data } = await apiSistema.post('permisos/create', nuevo);
    return data;
  }
);
export const deletepermisos = createAsyncThunk(
  'delete/postpermisos',
  async (id) => {
    const { data } = await apiSistema.delete(`permisos/delete/${id}`);
    return data;
  }
);
export const updatepermisos = createAsyncThunk(
  'update/postpermisos',
  async ({ id, FullName, Dni }) => {
    const { data } = await apiSistema.put(`permisos/update/${id}`, {
      FullName,
      Dni,
    });
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
