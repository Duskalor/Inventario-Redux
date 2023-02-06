import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListaEntradas from './ListaEntradas';
import { style } from '../style';
import FormNuevaEntrada from './FormNuevaEntrada';
import {
  borrarEstado,
  getDetalleEntradas,
} from '../ProductoEntrada/productoEntradaSlice';
import { useDispatch } from 'react-redux';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { getEntradas } from './entradaSlice';
import { getProductos } from '../Productos/productosSlice';
export function ChildModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    dispatch(borrarEstado());
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Nuevo Entrada</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 600 }}>
          <FormNuevaEntrada handleClose={handleClose} />
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutEntrada() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(getEntradas());
  //   dispatch(getProductos());
  //   dispatch(getDetalleEntradas());
  // }, [dispatch]);

  const handleOpen = () => {
    dispatch(borrarEstado());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ArrowDownwardIcon sx={{ fontSize: 60 }} />
        Entradas
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 1050, borderRadius: 4 }}>
          <ListaEntradas />
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
