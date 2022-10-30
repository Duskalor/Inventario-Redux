import { configureStore } from '@reduxjs/toolkit';
import { ClientesSlice } from './features/Clientes/clientesSlice';
import { productosSlice } from './features/Pruductos/productosSlice';

export const store = configureStore({
  reducer: {
    Clientes: ClientesSlice.reducer,
    Productos: productosSlice.reducer,
  },
});
