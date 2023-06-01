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
    productoSalida.forEach((pe) => {
      dispatch(createProductoSalida({ IdSalida, pe }));
      const ParaAgregar = productos.find((pro) => pro.id === +pe.IdProducto);
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
    id: null,
    error: null,
    loading: false,
  },

  extraReducers: (build) => {
    //get
    build
      .addCase(getSalidas.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSalidas.fulfilled, (state, { payload }) => {
        state.loading = false;
        const volteado = payload.ListaSalidas.reverse();
        state.salidas = volteado;
      })
      .addCase(getSalidas.rejected, (state) => {
        state.loading = false;
      })

      // create

      .addCase(createSalida.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSalida.fulfilled, (state, { payload }) => {
        state.loading = false;
        const volteado = payload.ListaSalidas.reverse();
        state.salidas = volteado;
      })
      .addCase(createSalida.rejected, (state) => {
        state.loading = false;
      })

      // delete
      .addCase(deleteSalidas.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSalidas.fulfilled, (state, { payload }) => {
        state.loading = false;
        const volteado = payload.ListaSalidas.reverse();
        state.salidas = volteado;
      })
      .addCase(deleteSalidas.rejected, (state) => {
        state.loading = false;
      });
  },
  // extraReducers: {
  //   ///GET

  //   //CREATE
  //   [createSalida.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [createSalida.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     const volteado = payload.ListaSalidas.reverse();
  //     state.salidas = volteado;
  //     state.id = payload.Salida.id;
  //   },
  //   [createSalida.rejected]: (state) => {
  //     state.loading = false;
  //   },
  //   //DELETE
  //   [deleteSalidas.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [deleteSalidas.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     const volteado = payload.ListaSalidas.reverse();
  //     state.filtrado = volteado;
  //   },
  //   [deleteSalidas.rejected]: (state) => {
  //     state.loading = false;
  //   },
  // },
});
