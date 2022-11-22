import { configureStore } from '@reduxjs/toolkit';
import { ClientesSlice } from './features/Clientes/clientesSlice';
import { datosSlice } from './features/Datos/datosSlice';
import { entradaSlice } from './features/Entrada/entradaSlice';
import { permisosSlice } from './features/Permisos/permisosSlice';
import { productosSlice } from './features/Productos/productosSlice';
import { ProveedorSlice } from './features/Proveedor/ProveedorSlice';
import { UsuariosSlice } from './features/Usuarios/UsuariosSlice';
export const store = configureStore({
  reducer: {
    Clientes: ClientesSlice.reducer,
    Datos: datosSlice.reducer,
    Productos: productosSlice.reducer,
    Proveedor: ProveedorSlice.reducer,
    Usuarios: UsuariosSlice.reducer,
    Permisos: permisosSlice.reducer,
    Entrada: entradaSlice.reducer,
  },
});
