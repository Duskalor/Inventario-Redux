import { TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
export default function ProductoSalidaVista({ producto }) {
  const { IdProducto, PrecioVenta, Cantidad, SubTotal } = producto;
  const { productos } = useSelector((state) => state.Productos);

  const ListaProductos = productos.find((pro) => pro.id === +IdProducto);

  return (
    producto && (
      <TableRow>
        <TableCell sx={{ textAlign: 'center' }}>
          {ListaProductos.Codigo}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {ListaProductos.Descripcion}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{PrecioVenta}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{Cantidad}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{SubTotal}</TableCell>
      </TableRow>
    )
  );
}
