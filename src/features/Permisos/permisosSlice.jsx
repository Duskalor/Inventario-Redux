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

    return data;
  }
);
export const createpermisos = createAsyncThunk(
  'create/postpermisos',
  async (nuevo, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth?.userToken}`,
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

    const { data } = await apiSistema.put(
      `permisos/update/${id}`,
      dato,
      config
    );
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
  extraReducers: (build) => {
    // getpermisos
    build
      .addCase(getpermisos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getpermisos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permisos = payload.Listapermisos;
      })
      .addCase(getpermisos.rejected, (state, { error }) => {
        state.loading = true;
        console.log(error.message);
      })
      // createpermisos
      .addCase(createpermisos.pending, (state) => {
        state.loading = true;
      })
      .addCase(createpermisos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permisos = payload.Listapermisos;
      })
      .addCase(createpermisos.rejected, (state) => {
        state.loading = true;
      })
      // deletepermisos
      .addCase(deletepermisos.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletepermisos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permisos = payload.Listapermisos;
      })
      .addCase(deletepermisos.rejected, (state) => {
        state.loading = true;
      })

      // UpdatePermisos
      .addCase(updatepermisos.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatepermisos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.permisos = payload.Listapermisos;
      })
      .addCase(updatepermisos.rejected, (state) => {
        state.loading = true;
      });
  },
});
