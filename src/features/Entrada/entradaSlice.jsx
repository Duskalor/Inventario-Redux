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

  extraReducers: (build) => {
    //  getEntradas

    build
      .addCase(getEntradas.pending, (state) => {
        state.loading = true;
      })
      .addCase(getEntradas.fulfilled, (state, { payload }) => {
        state.loading = false;
        const volteado = payload.ListaEntradas.reverse();
        state.entradas = volteado;
      })
      .addCase(getEntradas.rejected, (state) => {
        state.loading = false;
      })

      /// createEntradas

      .addCase(createEntradas.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEntradas.fulfilled, (state, { payload }) => {
        state.loading = false;
        const volteado = payload.ListaEntradas.reverse();
        state.entradas = volteado;
        state.id = payload.Entrada.id;
      })
      .addCase(createEntradas.rejected, (state) => {
        state.loading = false;
      })

      // deleteEntradas

      .addCase(deleteEntradas.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEntradas.fulfilled, (state, { payload }) => {
        state.loading = false;
        const volteado = payload.ListaEntradas.reverse();
        state.entradas = volteado;
      })
      .addCase(deleteEntradas.rejected, (state) => {
        state.loading = false;
      })

      // updateEntradas

      .addCase(updateEntradas.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEntradas.fulfilled, (state, { payload }) => {
        state.loading = false;
        const volteado = payload.ListaEntradas.reverse();
        state.entradas = volteado;
      })
      .addCase(updateEntradas.rejected, (state) => {
        state.loading = false;
      });
  },
});
