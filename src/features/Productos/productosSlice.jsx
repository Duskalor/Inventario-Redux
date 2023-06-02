import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getProductos = createAsyncThunk(
  'get/getProductos',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('producto', config);
    return data;
  }
);

export const createProducto = createAsyncThunk(
  'create/PostProducto',
  async (nuevo, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post('producto/create', nuevo, config);
    return data;
  }
);

export const deleteProductos = createAsyncThunk(
  'delete/postProductos',
  async (id, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.delete(`producto/delete/${id}`, config);
    return data;
  }
);

export const updateProductos = createAsyncThunk(
  'update/postProductos',
  async (datos, { getState }) => {
    const { id, Categoria, Descripcion, PrecioCompra, PrecioVenta, Stock } =
      datos;
    console.log({ datos });
    const { Auth } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };

    const { data } = await apiSistema.put(
      `producto/update/${id}`,
      {
        Categoria,
        Descripcion,
        PrecioCompra,
        PrecioVenta,
        Stock,
      },
      config
    );
    return data;
  }
);

export const productosSlice = createSlice({
  name: 'Productos',
  initialState: {
    productos: [],
    error: null,
    loading: false,
  },
  reducers: {
    borrarProductos: (state /* action */) => {
      state.productos = [];
    },
    logoutProductos: (state /* action */) => {
      state.productos = [];
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (build) => {
    // get
    build
      .addCase(getProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productos = payload.ListaProductos;
      })
      .addCase(getProductos.rejected, (state) => {
        state.loading = false;
      })

      // create

      .addCase(createProducto.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProducto.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productos = payload.ListaProductos;
      })
      .addCase(createProducto.rejected, (state) => {
        state.loading = false;
      })

      //delete

      .addCase(deleteProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productos = payload.ListaProductos;
      })
      .addCase(deleteProductos.rejected, (state) => {
        state.loading = false;
      })

      // update

      .addCase(updateProductos.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductos.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.productos = payload.ListaProductos;
      })
      .addCase(updateProductos.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { borrarProductos, logoutProductos } = productosSlice.actions;
