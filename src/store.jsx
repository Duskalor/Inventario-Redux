import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './features/Auth/authSlice';
import { datosSlice } from './features/Datos/datosSlice';
import { entradaSlice } from './features/Entrada/entradaSlice';
import { permisosSlice } from './features/Permisos/permisosSlice';
import { productoEntradaSlice } from './features/ProductoEntrada/productoEntradaSlice';
import { productosSlice } from './features/Productos/productosSlice';
import { productosSalidaSlice } from './features/ProductoSalidas/productosSalidaSlice';
import { salidasSlice } from './features/Salidas/salidasSlice';
import { UsuariosSlice } from './features/Usuarios/UsuariosSlice';
import { almacenesSlice } from './features/Almacenes/almacenesSlice';
export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    // [clientesSlice.name]: clientesSlice.reducer,
    [datosSlice.name]: datosSlice.reducer,
    [productosSlice.name]: productosSlice.reducer,
    // [ProveedorSlice.name]: ProveedorSlice.reducer,
    [UsuariosSlice.name]: UsuariosSlice.reducer,
    [permisosSlice.name]: permisosSlice.reducer,
    [entradaSlice.name]: entradaSlice.reducer,
    [productoEntradaSlice.name]: productoEntradaSlice.reducer,
    [salidasSlice.name]: salidasSlice.reducer,
    [productosSalidaSlice.name]: productosSalidaSlice.reducer,
    [almacenesSlice.name]: almacenesSlice.reducer,
  },
});
