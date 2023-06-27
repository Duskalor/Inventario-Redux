import { Box, Button, TableCell, TableRow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ModalEdit } from './ModalEdit';
import { deleteProductos } from './productosSlice';
import { roles, useUserLogin } from '../../utils/useUserLogin';
import { BoxStatus } from '../../components/BoxStatus';

export default function Productos({ productos }) {
  const { id, Categoria, Codigo, Descripcion, active, IdAlmacenes, Cantidad } =
    productos;
  const { id: idUser, IdAlmacenes: idAlmacenUser } = useUserLogin();
  const { almacenes } = useSelector((state) => state.Almacenes);
  const almancen = almacenes.find((alma) => alma.id === IdAlmacenes);
  // console.log(almancen);
  const dispatch = useDispatch();
  const deleteItem = (id) => {
    if (IdAlmacenes !== idAlmacenUser) {
      alert('no se puede eliminar');
    } else {
      if (window.confirm('Esta Seguro de eliminar este Producto?')) {
        dispatch(deleteProductos(id));
      }
    }
  };

  // useEffect(() => {
  //   dispatch(getDetalleEntradas());
  //   dispatch(getDetalleSalida());
  // }, []);

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
        <TableCell>{Descripcion}</TableCell>
        <TableCell>
          <Box>{Categoria}</Box>
        </TableCell>
        <TableCell>
          <Box>{almancen.ubicacion}</Box>
        </TableCell>
        {roles.admin === idUser && (
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
            {roles.admin === idUser && <ModalEdit id={id} />}
            <Button onClick={() => deleteItem(id)}>Eliminar</Button>
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}
