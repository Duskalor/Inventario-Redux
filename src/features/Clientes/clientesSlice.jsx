import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getClientes = createAsyncThunk(
  'get/getClientes',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('cliente', config);
    return data;
  }
);
export const createClientes = createAsyncThunk(
  'create/postClientes',
  async (nuevo, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post('cliente/create', nuevo, config);
    return data;
  }
);
export const deleteClientes = createAsyncThunk(
  'delete/postClientes',
  async (id, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.delete(`cliente/delete/${id}`, config);
    return data;
  }
);
export const updateClientes = createAsyncThunk(
  'update/postClientes',
  async ({ id, FullName, Dni }, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.put(
      `cliente/update/${id}`,
      {
        FullName,
        Dni,
      },
      config
    );
    return data;
  }
);

export const ClientesSlice = createSlice({
  name: 'Clientes',
  initialState: {
    clientes: [],
    error: null,
    loading: false,
  },

  extraReducers: (build) => {
    build
      ///GET
      .addCase(getClientes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.clientes = payload.ListaDeclientes;
      })
      .addCase(getClientes.rejected, (state) => {
        state.loading = false;
      })
      ///CREATE
      .addCase(createClientes.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClientes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.clientes = payload.ListaDeclientes;
      })
      .addCase(createClientes.rejected, (state) => {
        state.loading = false;
      })
      ///DELETE
      .addCase(deleteClientes.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteClientes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.clientes = payload.ListaDeclientes;
      })
      .addCase(deleteClientes.rejected, (state) => {
        state.loading = false;
      })
      ///UPDATE
      .addCase(updateClientes.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateClientes.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.clientes = payload.ListaDeclientes;
      })
      .addCase(updateClientes.rejected, (state) => {
        state.loading = false;
      });
  },
  // extraReducers: {
  //   ///GET
  //   [getClientes.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [getClientes.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.clientes = payload.ListaDeclientes;
  //   },
  //   [getClientes.rejected]: (state) => {
  //     state.loading = false;
  //   },
  //   //CREATE
  //   [createClientes.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [createClientes.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.clientes = payload.ListaDeclientes;
  //   },
  //   [createClientes.rejected]: (state) => {
  //     state.loading = false;
  //   },
  //   //DELETE
  //   [deleteClientes.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [deleteClientes.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.clientes = payload.ListaDeclientes;
  //   },
  //   [deleteClientes.rejected]: (state) => {
  //     state.loading = false;
  //   },

  //   //UPDATE
  //   [updateClientes.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [updateClientes.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     state.clientes = payload.ListaDeclientes;
  //   },
  //   [updateClientes.rejected]: (state) => {
  //     state.loading = false;
  //   },
  // },
});
