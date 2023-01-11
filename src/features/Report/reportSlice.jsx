import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getDatosReports = createAsyncThunk(
  'get/getDatosReports',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('report', config);
    // console.log(data);
    return data;
  }
);

// export const updateDatos = createAsyncThunk(
//   'update/updateDatos',
//   async ({ id, RazonSocial, Direccion, Ruc }, { getState }) => {
//     const { Auth } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${Auth.userToken}`,
//       },
//     };
//     const { data } = await apiSistema.put(
//       `datos/update/${id}`,
//       {
//         RazonSocial,
//         Ruc,
//         Direccion,
//       },
//       config
//     );
//     return data;
//   }
// );
export const reportSlice = createSlice({
  name: 'Report',
  initialState: {
    reports: [],
    DatosReports: [],
    fecha: '',
    mes: '',
    hora: '',
    pending: false,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },

  extraReducers: {
    [getDatosReports.pending]: (state) => {
      state.pending = true;
    },
    [getDatosReports.fulfilled]: (state, action) => {
      state.pending = false;
      state.DatosReports = action.payload.ListaDatos;
    },
    [getDatosReports.rejected]: (state) => {
      state.pending = false;
    },
    //   [updateDatos.pending]: (state) => {
    //     state.pending = true;
    //   },
    //   [updateDatos.fulfilled]: (state, action) => {
    //     state.pending = false;
    //     state.id = action.payload.Datos[0].id;
    //     state.RazonSocial = action.payload.Datos[0].RazonSocial;
    //     state.Direccion = action.payload.Datos[0].Direccion;
    //     state.Ruc = action.payload.Datos[0].Ruc;
    //   },
    //   [updateDatos.rejected]: (state) => {
    //     state.pending = false;
    //   },
  },
});
export const { increment } = reportSlice.actions;
