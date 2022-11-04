import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getProductos = createAsyncThunk('get/getProductos', async () => {
  const { data } = await apiSistema.get('producto');
  return data;
});

export const createProducto = createAsyncThunk(
  'create/PostProducto',
  async (nuevo) => {
    const { data } = await apiSistema.post('producto/create', nuevo);
    return data;
  }
);

export const deleteProductos = createAsyncThunk(
  'delete/postProductos',
  async (id) => {
    const { data } = await apiSistema.delete(`producto/delete/${id}`);
    return data;
  }
);

export const updateProductos = createAsyncThunk(
  'update/postClientes',
  async ({ id, Categoria, Descripcion, PrecioCompra, PrecioVenta, Stock }) => {
    const { data } = await apiSistema.put(`producto/update/${id}`, {
      Categoria,
      Descripcion,
      PrecioCompra,
      PrecioVenta,
      Stock,
    });
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
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },
  extraReducers: {
    //GET
    [getProductos.pending]: (state) => {
      state.loading = true;
    },
    [getProductos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productos = payload.ListaProductos;
    },
    [getProductos.rejected]: (state) => {
      state.loading = false;
    },
    // CREATE
    [createProducto.pending]: (state) => {
      state.loading = true;
    },
    [createProducto.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productos = payload.ListaProductos;
    },
    [createProducto.rejected]: (state) => {
      state.loading = false;
    },
    // DELETE
    [deleteProductos.pending]: (state) => {
      state.loading = true;
    },
    [deleteProductos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productos = payload.ListaProductos;
    },
    [deleteProductos.rejected]: (state) => {
      state.loading = false;
    },
    // UPDATE
    [updateProductos.pending]: (state) => {
      state.loading = true;
    },
    [updateProductos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productos = payload.ListaProductos;
    },
    [updateProductos.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = productosSlice.actions;
