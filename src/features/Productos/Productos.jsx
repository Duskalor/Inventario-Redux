import { Box, Button, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deleteProductos } from './productosSlice';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import { BoxStatus } from '../../components/BoxStatus';

export default function Productos({ productos }) {
  const { id, Categoria, Codigo, Descripcion, active, IdAlmacenes, Cantidad } =
    productos;
  const { IdAlmacenes: idAlmacenUser, IdPermisos } = useUserLogin();
  const { almacenes } = useSelector((state) => state.Almacenes);
  const almancen = almacenes.find((alma) => alma.id === IdAlmacenes);
  // console.log(almancen);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    if (IdAlmacenes !== idAlmacenUser) return alert('no se puede eliminar');
    if (Cantidad !== 0)
      return alert(
        `no se puede eliminar el ${Descripcion} contiene la cantidad de items : ${Cantidad}`
      );
    if (window.confirm('Esta Seguro de eliminar este Producto?')) {
      dispatch(deleteProductos(id));
    }
  };
  return (
    <>
      <TableRow
        sx={{
          '&>td>div': { display: 'flex', justifyContent: 'center' },
          '&>td': { height: '30px', color: 'white' },
        }}
      >
        <TableCell>
          <Box>{Codigo}</Box>
        </TableCell>
        <TableCell>
          <Box>{Descripcion}</Box>
        </TableCell>
        <TableCell>
          <Box>{Categoria}</Box>
        </TableCell>
        <TableCell>
          <Box>{almancen.ubicacion}</Box>
        </TableCell>
        {roles.admin === IdPermisos && (
          <TableCell>
            <BoxStatus active={active}>
              {active ? <Box>Active</Box> : <Box>No active</Box>}
            </BoxStatus>
          </TableCell>
        )}
        <TableCell>
          <Box>{Cantidad}</Box>
        </TableCell>

        <TableCell>
          <Box>
            {roles.admin === IdPermisos && <ModalEdit id={id} />}
            <Button onClick={() => deleteItem(id)}>Eliminar</Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}
