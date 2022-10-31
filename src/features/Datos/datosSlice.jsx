import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getDatos = createAsyncThunk('get/getDatos', async () => {
  const { data } = await apiSistema.get('datos');
  //console.log(data);
  return data;
});
export const datosSlice = createSlice({
  name: 'Datos',
  initialState: {
    Direccion: '',
    RazonSocial: '',
    Ruc: '',
    id: '',
    pending: false,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },

  extraReducers: {
    [getDatos.pending]: (state, action) => {
      state.pending = true;
    },
    [getDatos.fulfilled]: (state, action) => {
      state.pending = false;
      state.id = action.payload.Datos[0].id;
      state.RazonSocial = action.payload.Datos[0].RazonSocial;
      state.Direccion = action.payload.Datos[0].Direccion;
      state.Ruc = action.payload.Datos[0].Ruc;
    },
    [getDatos.rejected]: (state, action) => {
      state.pending = false;
    },
  },
});
export const { increment } = datosSlice.actions;
