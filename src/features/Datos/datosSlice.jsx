import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getDatos = createAsyncThunk(
  'get/getDatos',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('datos', config);
    // console.log(data);
    return data;
  }
);

export const updateDatos = createAsyncThunk(
  'update/updateDatos',
  async ({ id, RazonSocial, Direccion, Ruc }, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.put(
      `datos/update/${id}`,
      {
        RazonSocial,
        Ruc,
        Direccion,
      },
      config
    );
    return data;
  }
);
export const datosSlice = createSlice({
  name: 'Datos',
  initialState: {
    Direccion: '',
    RazonSocial: '',
    Ruc: '',
    id: '',
    pending: false,
  },

  extraReducers: (build) => {
    build
      // Get
      .addCase(getDatos.pending, (state) => {
        state.pending = true;
      })
      .addCase(getDatos.fulfilled, (state, action) => {
        state.pending = false;
        state.id = action.payload.Datos[0].id;
        state.RazonSocial = action.payload.Datos[0].RazonSocial;
        state.Direccion = action.payload.Datos[0].Direccion;
        state.Ruc = action.payload.Datos[0].Ruc;
      })
      .addCase(getDatos.rejected, (state) => {
        state.pending = false;
      })

      // UPDATE
      .addCase(updateDatos.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateDatos.fulfilled, (state, action) => {
        state.pending = false;
        state.id = action.payload.Datos[0].id;
        state.RazonSocial = action.payload.Datos[0].RazonSocial;
        state.Direccion = action.payload.Datos[0].Direccion;
        state.Ruc = action.payload.Datos[0].Ruc;
      })
      .addCase(updateDatos.rejected, (state) => {
        state.pending = false;
      });
  },
});
