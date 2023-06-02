import { TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';

export default function ProductoEntradaVista({ producto }) {
  const { IdProducto, PrecioCompra, Cantidad, SubTotal } = producto;

  const { productos } = useSelector((state) => state.Productos);
  const ListaProductos = productos.find((pro) => pro.id === +IdProducto);

  return (
    producto && (
      <TableRow>
        <TableCell>{ListaProductos.Codigo}</TableCell>
        <TableCell>{ListaProductos.Descripcion}</TableCell>
        <TableCell>{PrecioCompra}</TableCell>
        <TableCell>{Cantidad}</TableCell>
        <TableCell>{SubTotal}</TableCell>
      </TableRow>
    )
  );
}
