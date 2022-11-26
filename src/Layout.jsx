import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/Auth/authSlice';

import LayoutClientes from './features/Clientes/LayoutClientes';
import LayoutDatos from './features/Datos/LayoutDatos';
import LayoutEntrada from './features/Entrada/LayoutEntrada';
import LayoutPermisos from './features/Permisos/LayoutPermisos';
import LayoutProducto from './features/Productos/LayoutProducto';
import LayoutProveedores from './features/Proveedor/LayoutProveedores';
import LayoutUsuarios from './features/Usuarios/LayoutUsuarios';

export default function Layout() {
  const { RazonSocial } = useSelector((state) => state.Datos);

  const dispatch = useDispatch();
  return (
    <div>
      <h1>Sistema De Inventario {RazonSocial}</h1>
      <Button variant='contained' onClick={() => dispatch(logout())}>
        Logout
      </Button>
      <LayoutClientes />
      <LayoutDatos />
      <LayoutProducto />
      <LayoutProveedores />
      <LayoutUsuarios />
      <LayoutPermisos />
      <LayoutEntrada />
    </div>
  );
}
