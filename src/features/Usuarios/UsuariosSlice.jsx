import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getUsuarios = createAsyncThunk('get/getUsuarios', async () => {
  const { data } = await apiSistema.get('user');
  return data;
});
export const createUsuarios = createAsyncThunk(
  'create/postUsuarios',
  async (nuevo) => {
    // console.log({ nuevo });
    const { data } = await apiSistema.post('user/create', nuevo);
    return data;
  }
);
export const deleteUsuarios = createAsyncThunk(
  'delete/postUsuarios',
  async (id) => {
    const { data } = await apiSistema.delete(`user/delete/${id}`);
    return data;
  }
);
export const updateUsuarios = createAsyncThunk(
  'update/postUsuarios',
  async ({ id, ...Rest }) => {
    const { data } = await apiSistema.put(`user/update/${id}`, Rest);
    return data;
  }
);

export const UsuariosSlice = createSlice({
  name: 'Usuarios',
  initialState: {
    usuarios: [],
    error: null,
    loading: false,
  },
  reducers: {
    LogoutUsuario: (state /* action */) => {
      state.usuarios = [];
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (build) => {
    build
      ///GET
      .addCase(getUsuarios.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsuarios.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.usuarios = payload.ListaUsuarios;
      })
      .addCase(getUsuarios.rejected, (state) => {
        state.loading = false;
      })

      // create
      .addCase(createUsuarios.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUsuarios.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.usuarios = payload.ListaUsuarios;
      })
      .addCase(createUsuarios.rejected, (state) => {
        state.loading = false;
      })

      // delete

      .addCase(deleteUsuarios.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUsuarios.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.usuarios = payload.ListaUsuarios;
      })
      .addCase(deleteUsuarios.rejected, (state) => {
        state.loading = false;
      })

      // update
      .addCase(updateUsuarios.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUsuarios.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.usuarios = payload.ListaUsuarios;
      })
      .addCase(updateUsuarios.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { increment, LogoutUsuario } = UsuariosSlice.actions;
