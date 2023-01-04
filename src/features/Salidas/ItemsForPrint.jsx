import { TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
export default function ItemsForPrint({ producto }) {
  const { productos } = useSelector((state) => state.Productos);
  const DatoProducto = productos.find((pro) => pro.id == producto.IdProducto);

  return (
    producto && (
      <TableRow>
        <TableCell sx={{ textAlign: 'center' }}>{producto.Cantidad}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {DatoProducto.Descripcion}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>
          {producto.PrecioVenta}
        </TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{producto.SubTotal}</TableCell>
      </TableRow>
    )
  );
}
