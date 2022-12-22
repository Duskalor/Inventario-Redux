import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getDetalleEntradas = createAsyncThunk(
  'get/getDetalleEntradas',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('detalleEntrada', config);
    //console.log(data);
    return data;
  }
);
export const createProductoEntrada = createAsyncThunk(
  'create/postProductoEntrada',
  async (nuevo, { getState }) => {
    const { Auth } = getState();
    //console.log(nuevo);
    const { IdEntrada } = nuevo;
    const { IdProducto, PrecioCompra, Cantidad, SubTotal } = nuevo.pe;
    //console.log(IdEntrada, IdProducto, PrecioCompra, Cantidad, SubTotal);
    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post(
      'detalleEntrada/create',
      { IdEntrada, IdProducto, PrecioCompra, Cantidad, SubTotal },
      config
    );
    return data;
  }
);

export const updateProductoEntrada = createAsyncThunk(
  'update/postProductoEntrada',
  async ({ pe }, { getState }) => {
    const { Auth } = getState();
    const { id, IdEntrada, IdProducto, PrecioCompra, Cantidad, SubTotal } = pe;

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.put(
      `detalleEntrada/update/${id}`,
      {
        id,
        IdEntrada,
        IdProducto,
        PrecioCompra,
        Cantidad,
        SubTotal,
      },
      config
    );
    return data;
  }
);

export const EditProductoEntrada = createAsyncThunk(
  'create/postProductoEntrada',
  async ({ pe }, { getState }) => {
    const { Auth } = getState();
    //console.log(nuevo);

    const { IdEntrada, IdProducto, PrecioCompra, Cantidad, SubTotal } = pe;
    //console.log(IdEntrada, IdProducto, PrecioCompra, Cantidad, SubTotal);
    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post(
      'detalleEntrada/create',
      { IdEntrada, IdProducto, PrecioCompra, Cantidad, SubTotal },
      config
    );
    return data;
  }
);
export const DeleteProductoEntrada = createAsyncThunk(
  'delete/postProductosEntrada',
  async (id, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.delete(
      `detalleEntrada/delete/${id}`,
      config
    );
    return data;
  }
);

export const productoEntradaSlice = createSlice({
  name: 'ProductoEntrada',
  initialState: {
    productoEntradaBD: [],
    productoEntrada: [],
    productoEntradaEdit: [],
    change: false,
    loading: false,
  },
  reducers: {
    GuardarEstado: (state, { payload }) => {
      //console.log(payload);
      if (!payload.IdProducto == '') {
        state.productoEntrada = [...state.productoEntrada, payload];
      }
    },
    borrarEstado: (state) => {
      //console.log(payload);
      state.productoEntrada = [];
    },
    borrarItem: (state, { payload }) => {
      console.log(payload);
      state.productoEntrada = state.productoEntrada.filter(
        (item) => item.IdProducto !== payload
      );
      console.log(state.productoEntrada);
    },

    borrarItemEdit: (state, { payload }) => {
      // console.log(payload);
      state.productoEntradaEdit = state.productoEntradaEdit.filter(
        (item) => item.IdProducto !== payload
      );
    },
    GuardarDatos: (state, { payload }) => {
      // console.log(payload);
      state.productoEntradaEdit = payload;
    },

    GuardarEstadoEdit: (state, { payload }) => {
      if (!payload.IdProducto == '') {
        state.productoEntradaEdit = [...state.productoEntradaEdit, payload];
      }
    },
    BorrarEstadoEdit: (state, { payload }) => {
      state.productoEntradaBD = [];
    },
  },

  extraReducers: {
    ///GET
    [getDetalleEntradas.pending]: (state) => {
      state.loading = true;
    },
    [getDetalleEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      //console.log(payload);
      state.productoEntradaBD = payload.ListaDetalleEntrada;
    },
    [getDetalleEntradas.rejected]: (state) => {
      state.loading = false;
    },

    [createProductoEntrada.pending]: (state) => {
      state.loading = true;
    },
    [createProductoEntrada.fulfilled]: (state, action) => {
      state.loading = false;
      //console.log(action);
    },
    [createProductoEntrada.rejected]: (state, action) => {
      state.loading = false;
      //console.log(action);
    },
    [DeleteProductoEntrada.pending]: (state) => {
      state.loading = true;
    },
    [DeleteProductoEntrada.fulfilled]: (state, action) => {
      state.loading = false;
      //console.log(action);
    },
    [DeleteProductoEntrada.rejected]: (state, action) => {
      state.loading = false;
      //console.log(action);
    },
  },
});
export const {
  GuardarEstado,
  borrarEstado,
  borrarItem,
  borrarItemEdit,
  GuardarEstadoEdit,
  BorrarEstadoEdit,
  GuardarDatos,
} = productoEntradaSlice.actions;
