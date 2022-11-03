import LayoutClientes from './features/Clientes/LayoutClientes';
import LayoutDatos from './features/Datos/LayoutDatos';
import LayoutProducto from './features/Productos/LayoutProducto';
export default function Layout() {
  return (
    <div>
      <LayoutClientes />
      <LayoutDatos />
      <LayoutProducto />
    </div>
  );
}
