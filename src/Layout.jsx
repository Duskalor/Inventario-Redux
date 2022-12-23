import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/Auth/authSlice';

import LayoutClientes from './features/Clientes/LayoutClientes';
import LayoutDatos from './features/Datos/LayoutDatos';
import LayoutEntrada from './features/Entrada/LayoutEntrada';
import LayoutPermisos from './features/Permisos/LayoutPermisos';
import LayoutProducto from './features/Productos/LayoutProducto';
import LayoutProveedores from './features/Proveedor/LayoutProveedores';
import Salidas from './features/Salidas/Salidas';
import LayoutUsuarios from './features/Usuarios/LayoutUsuarios';

export default function Layout() {
  const { RazonSocial } = useSelector((state) => state.Datos);
  const { user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const { permisos } = useSelector((state) => state.Permisos);
  //console.log(user);
  const UserPermiso = permisos.find((permiso) => permiso.id == user.IdPermisos);
  //console.log(UserPermiso);
  return (
    <div>
      <h1>Sistema De Inventario {RazonSocial}</h1>
      <h1>Bienvenido {user.FullName}</h1>
      <Button variant='contained' onClick={() => dispatch(logout())}>
        Logout
      </Button>
      {UserPermiso?.Clientes === 1 && <LayoutClientes />}
      {UserPermiso?.Configuracion === 1 && <LayoutDatos />}
      {UserPermiso?.Productos === 1 && <LayoutProducto />}
      {UserPermiso?.Proveedores === 1 && <LayoutProveedores />}
      {UserPermiso?.Usuarios === 1 && <LayoutUsuarios />}
      {UserPermiso?.Permisos === 1 && <LayoutPermisos />}
      {UserPermiso?.Entradas === 1 && <LayoutEntrada />}
      {UserPermiso?.Salidas === 1 && <Salidas />}
    </div>
  );
}
