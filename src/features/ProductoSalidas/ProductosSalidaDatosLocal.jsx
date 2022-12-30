import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ProductosSalida from './ProductosSalida';

export default function ProductosSalidaDatosLocal() {
  const { productoSalida } = useSelector((state) => state.ProductoSalida);

  return (
    <div>
      {productoSalida && (
        <TableContainer component={Paper}>
          <Table arial-label='simple tables'>
            <TableHead>
              <TableRow>
                <TableCell>Codigo</TableCell>
                <TableCell>Producto</TableCell>
                <TableCell>Precio de Compra</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>SubTotal</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productoSalida.map((producto, id) => (
                <ProductosSalida key={id} producto={producto} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
