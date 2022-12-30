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
    Auth: authSlice.reducer,
    Clientes: ClientesSlice.reducer,
    Datos: datosSlice.reducer,
    Productos: productosSlice.reducer,
    Proveedor: ProveedorSlice.reducer,
    Usuarios: UsuariosSlice.reducer,
    Permisos: permisosSlice.reducer,
    Entrada: entradaSlice.reducer,
    ProductoEntrada: productoEntradaSlice.reducer,
    Salida: salidasSlice.reducer,
    ProductoSalida: productosSalidaSlice.reducer,
  },
});
