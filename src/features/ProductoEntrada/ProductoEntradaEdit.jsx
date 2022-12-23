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
import ProductoEntradaDatosEdit from './ProductoEntradaDatosEdit';

export default function ProductoEntradaEdit() {
  const { productoEntradaEdit } = useSelector((state) => state.ProductoEntrada);

  //console.log(productoEntradaEdit);
  return (
    <div>
      {productoEntradaEdit && (
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
              {productoEntradaEdit.map((producto, id) => (
                <ProductoEntradaDatosEdit key={id} producto={producto} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
