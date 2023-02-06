import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';
import {
  borrarProductos,
  getProductos,
  updateProductos,
} from '../Productos/productosSlice';
import {
  BorrarEstadoEdit,
  createProductoSalida,
  getDetalleSalida,
} from '../ProductoSalidas/productosSalidaSlice';
import { getClientes } from '../Clientes/clientesSlice';

export const getSalidas = createAsyncThunk(
  'get/getSalidas',
  async (_, { getState }) => {
    const { Auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get('salida', config);
    return data;
  }
);
export const createSalida = createAsyncThunk(
  'create/postSalidas',
  async ({ datos, productoSalida, productos }, { dispatch, getState }) => {
    const { Auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    //console.log(nuevo);
    const { data } = await apiSistema.post('salida/create', datos, config);
    const IdSalida = data.Salida.id;
    //console.log(data);
    productoSalida.map((pe) => {
      dispatch(createProductoSalida({ IdSalida, pe }));
      const ParaAgregar = productos.find((pro) => pro.id == pe.IdProducto);
      const pro = { ...ParaAgregar };
      pro.Stock = pro.Stock - parseInt(pe.Cantidad);
      dispatch(updateProductos(pro));
      //console.log(pro);
    });
    dispatch(getClientes());
    dispatch(getDetalleSalida());
    dispatch(borrarProductos());
    dispatch(getProductos());

    dispatch(BorrarEstadoEdit());
    return data;
  }
);
export const deleteSalidas = createAsyncThunk(
  'delete/postSalidas',
  async (id, { getState }) => {
    const { Auth } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.delete(`salida/delete/${id}`, config);
    return data;
  }
);

export const salidasSlice = createSlice({
  name: 'Salidas',
  initialState: {
    salidas: [],
    filtrado: [],
    id: null,
    error: null,
    loading: false,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
    filtrar: (state, action) => {
      var tablaBusqueda = state.salidas.filter((elemento) => {
        if (
          elemento.NumeroDocumento.toString()
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ) {
          return elemento;
        }
      });
      state.filtrado = tablaBusqueda;
    },
  },
  extraReducers: {
    ///GET
    [getSalidas.pending]: (state) => {
      state.loading = true;
    },
    [getSalidas.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.salidas = payload.ListaSalidas.reverse();
      state.filtrado = payload.ListaSalidas.reverse();
    },
    [getSalidas.rejected]: (state) => {
      state.loading = false;
    },
    //CREATE
    [createSalida.pending]: (state) => {
      state.loading = true;
    },
    [createSalida.fulfilled]: (state, { payload }) => {
      state.loading = false;

      state.salidas = payload.ListaSalidas.reverse();
      state.filtrado = payload.ListaSalidas.reverse();
      state.id = payload.Salida.id;
    },
    [createSalida.rejected]: (state) => {
      state.loading = false;
    },
    //DELETE
    [deleteSalidas.pending]: (state) => {
      state.loading = true;
    },
    [deleteSalidas.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.salidas = payload.ListaSalidas.reverse();
      state.filtrado = payload.ListaSalidas.reverse();
    },
    [deleteSalidas.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment, filtrar } = salidasSlice.actions;
