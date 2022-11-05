import LayoutClientes from './features/Clientes/LayoutClientes';
import LayoutDatos from './features/Datos/LayoutDatos';
import LayoutProducto from './features/Productos/LayoutProducto';
import LayoutProveedores from './features/Proveedor/LayoutProveedores';
export default function Layout() {
  return (
    <div>
      <LayoutClientes />
      <LayoutDatos />
      <LayoutProducto />
      <LayoutProveedores />
    </div>
  );
}
