import LayoutClientes from './features/Clientes/LayoutClientes';
import LayoutDatos from './features/Datos/LayoutDatos';
import LayoutEntrada from './features/Entrada/LayoutEntrada';
import LayoutPermisos from './features/Permisos/LayoutPermisos';
import LayoutProducto from './features/Productos/LayoutProducto';
import LayoutProveedores from './features/Proveedor/LayoutProveedores';
import LayoutUsuarios from './features/Usuarios/LayoutUsuarios';

export default function Layout() {
  return (
    <div>
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
