import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';
import {
  BorrarEstadoEdit,
  createProductoEntrada,
  getDetalleEntradas,
} from '../ProductoEntrada/productoEntradaSlice';
import {
  borrarProductos,
  getProductos,
  updateProductos,
} from '../Productos/productosSlice';

export const getEntradas = createAsyncThunk(
  'get/getEntradas',
  async (_, { getState }) => {
    const { Auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('entrada', config);
    return data;
  }
);

export const createEntradas = createAsyncThunk(
  'create/postEntradas',
  async ({ datos, productoEntrada }, { dispatch, getState }) => {
    const {
      Auth,
      Productos: { productos },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.post('entrada/create', datos, config);
    const IdEntrada = data.Entrada.id;

    productoEntrada.forEach((pe) => {
      dispatch(createProductoEntrada({ IdEntrada, pe }));
      const ParaModificar = productos.find((pro) => {
        return pro.id === +pe.IdProducto;
      });
      const pro = structuredClone(ParaModificar);
      pro.Stock = pro.Stock + parseInt(pe.Cantidad);
      dispatch(updateProductos(pro));
    });
    dispatch(getDetalleEntradas());
    dispatch(borrarProductos());
    dispatch(getProductos());
    dispatch(BorrarEstadoEdit());

    console.log({ data });
    return data;
  }
);
export const deleteEntradas = createAsyncThunk(
  'delete/postEntradas',
  async (id, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.delete(`entrada/delete/${id}`, config);
    return data;
  }
);
export const updateEntradas = createAsyncThunk(
  'update/postEntradas',
  async (
    { id, CantidadProductos, IdProveedor, IdUsuario, MontoTotal },
    { dispatch, getState }
  ) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    //console.log({ id, CantidadProductos, IdProveedor, IdUsuario, MontoTotal });
    const { data } = await apiSistema.put(
      `entrada/update/${id}`,
      {
        IdUsuario,
        IdProveedor,
        CantidadProductos,
        MontoTotal,
      },
      config
    );
    dispatch(BorrarEstadoEdit());
    dispatch(getDetalleEntradas());

    return data;
  }
);

export const entradaSlice = createSlice({
  name: 'Entradas',
  initialState: {
    entradas: [],
    id: null,
    error: false,
    loading: false,
  },
  reducers: {
    // borrarEntrada: (state, payload) => {
    //   // console.log(payload);
    //   state.entradas = [];
    // },
    // filtrar: (state, action) => {
    //   const tablaBusqueda = state.entradas.filter((elemento) => {
    //     if (
    //       elemento.NumeroDocumento.toString()
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
    ///GET
    [getEntradas.pending]: (state) => {
      state.loading = true;
    },
    [getEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const volteado = payload.ListaEntradas.reverse();
      state.entradas = volteado;
      state.filtrado = volteado;
    },
    [getEntradas.rejected]: (state) => {
      state.loading = false;
    },
    //CREATE
    [createEntradas.pending]: (state) => {
      state.loading = true;
    },
    [createEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const volteado = payload.ListaEntradas.reverse();
      state.entradas = volteado;
      state.filtrado = volteado;
      state.id = payload.Entrada.id;
    },
    [createEntradas.rejected]: (state, action) => {
      state.loading = false;
      console.log(action.error);
    },
    //DELETE
    [deleteEntradas.pending]: (state) => {
      state.loading = true;
    },
    [deleteEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const volteado = payload.ListaEntradas.reverse();
      state.entradas = volteado;
      state.filtrado = volteado;
    },
    [deleteEntradas.rejected]: (state) => {
      state.loading = false;
    },

    //UPDATE
    [updateEntradas.pending]: (state) => {
      state.loading = true;
    },
    [updateEntradas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      const volteado = payload.ListaEntradas.reverse();
      state.entradas = volteado;
      state.filtrado = volteado;
    },
    [updateEntradas.rejected]: (state) => {
      state.loading = false;
    },
  },
});

// export const { borrarEntrada, filtrar } = entradaSlice.actions;
