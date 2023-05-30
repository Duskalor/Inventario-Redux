import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './features/Auth/authSlice';
import { ClientesSlice } from './features/Clientes/clientesSlice';
import { datosSlice } from './features/Datos/datosSlice';
import { entradaSlice } from './features/Entrada/entradaSlice';
import { permisosSlice } from './features/Permisos/permisosSlice';
import { productoEntradaSlice } from './features/ProductoEntrada/productoEntradaSlice';
import { productosSlice } from './features/Productos/productosSlice';
import { productosSalidaSlice } from './features/ProductoSalidas/productosSalidaSlice';
import { ProveedorSlice } from './features/Proveedor/ProveedorSlice';
import { salidasSlice } from './features/Salidas/salidasSlice';
import { UsuariosSlice } from './features/Usuarios/UsuariosSlice';
export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [ClientesSlice.name]: ClientesSlice.reducer,
    [datosSlice.name]: datosSlice.reducer,
    [productosSlice.name]: productosSlice.reducer,
    [ProveedorSlice.name]: ProveedorSlice.reducer,
    [UsuariosSlice.name]: UsuariosSlice.reducer,
    [permisosSlice.name]: permisosSlice.reducer,
    [entradaSlice.name]: entradaSlice.reducer,
    [productoEntradaSlice.name]: productoEntradaSlice.reducer,
    [salidasSlice.name]: salidasSlice.reducer,
    [productosSalidaSlice.name]: productosSalidaSlice.reducer,
  },
});
