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
    filtrado: [],
    error: null,
    loading: false,
  },
  reducers: {
    borrarProductos: (state /* action */) => {
      state.productos = [];
    },
    // filtrar: (state, action) => {
    //   var tablaBusqueda = state.productos.filter((elemento) => {
    //     if (
    //       elemento.Codigo.toString()
    //         .toLowerCase()
    //         .includes(action.payload.toLowerCase()) ||
    //       elemento.Descripcion.toString()
    //         .toLowerCase()
    //         .includes(action.payload.toLowerCase())
    //     ) {
    //       return elemento;
    //     }
    //   });
    //   state.filtrado = tablaBusqueda;
    // },
  },
  extraReducers: {
    //GET
    [getProductos.pending]: (state) => {
      state.loading = true;
    },
    [getProductos.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.productos = payload.ListaProductos;
      state.filtrado = payload.ListaProductos;
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
export const { borrarProductos } = productosSlice.actions;
