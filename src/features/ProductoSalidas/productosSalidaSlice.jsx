import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';

export const getDetalleSalida = createAsyncThunk(
  'get/getDetalleSalida',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('detalleSalida', config);
    //console.log(data);
    return data;
  }
);
export const createProductoSalida = createAsyncThunk(
  'create/postProductoSalida',
  async (nuevo, { getState }) => {
    const { Auth } = getState();
    //console.log(nuevo);
    const { IdSalida } = nuevo;
    const { IdProducto, PrecioVenta, Cantidad, SubTotal } = nuevo.pe;
    console.log(IdSalida, IdProducto, PrecioVenta, Cantidad, SubTotal);
    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post(
      'detalleSalida/create',
      { IdSalida, IdProducto, PrecioVenta, Cantidad, SubTotal },
      config
    );
    return data;
  }
);

export const CrearProductoSalida = createAsyncThunk(
  'update/postProductoSalida',
  async ({ pe }, { getState }) => {
    const { Auth } = getState();
    const { id, IdSalida, IdProducto, PrecioCompra, Cantidad, SubTotal } = pe;

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.put(
      `detalleSalida/update/${id}`,
      {
        id,
        IdSalida,
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
      'detalleSalida/create',
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
      `detalleSalida/delete/${id}`,
      config
    );
    return data;
  }
);

export const productosSalidaSlice = createSlice({
  name: 'ProductoSalida',
  initialState: {
    productoSalidaBD: [],
    productoSalida: [],
    productoSalidaEdit: [],
    change: false,
    loading: false,
  },
  reducers: {
    GuardarEstado: (state, { payload }) => {
      //console.log(payload);
      if (!payload.IdProducto == '') {
        state.productoSalida = [...state.productoSalida, payload];
      }
    },
    borrarEstado: (state) => {
      //console.log(payload);
      state.productoSalida = [];
    },
    borrarItem: (state, { payload }) => {
      //console.log(payload);
      state.productoSalida = state.productoSalida.filter(
        (item) => item.IdProducto !== payload
      );
      //console.log(state.productoSalida);
    },

    borrarItemEdit: (state, { payload }) => {
      // console.log(payload);
      state.productoSalidaEdit = state.productoSalidaEdit.filter(
        (item) => item.IdProducto !== payload
      );
    },
    GuardarDatos: (state, { payload }) => {
      // console.log(payload);
      state.productoSalidaEdit = payload;
    },

    GuardarEstadoEdit: (state, { payload }) => {
      if (!payload.IdProducto == '') {
        state.productoSalidaEdit = [...state.productoSalidaEdit, payload];
      }
    },
    BorrarEstadoEdit: (state, { payload }) => {
      state.productoSalidaBD = [];
    },
  },

  extraReducers: {
    ///GET
    [getDetalleSalida.pending]: (state) => {
      state.loading = true;
    },
    [getDetalleSalida.fulfilled]: (state, { payload }) => {
      state.loading = false;
      //console.log(payload);
      state.productoSalidaBD = payload.ListadetallesSalida;
    },
    [getDetalleSalida.rejected]: (state) => {
      state.loading = false;
    },

    [createProductoSalida.pending]: (state) => {
      state.loading = true;
    },
    [createProductoSalida.fulfilled]: (state, action) => {
      state.loading = false;
      //console.log(action);
    },
    [createProductoSalida.rejected]: (state, action) => {
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
} = productosSalidaSlice.actions;
