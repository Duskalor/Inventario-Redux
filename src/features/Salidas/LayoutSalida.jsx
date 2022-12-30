import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { style } from '../style';
import ListaSalidas from './ListaSalidas';
import FormNuevaSalida from './FormNuevaSalida';
import { borrarEstado } from '../ProductoSalidas/productosSalidaSlice';
import { useDispatch } from 'react-redux';

export function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
    dispatch(borrarEstado());
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Nueva Venta</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 600 }}>
          <FormNuevaSalida handleClose={handleClose} />
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutSalida() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    dispatch(borrarEstado());
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Salidas</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 800 }}>
          <ListaSalidas />
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
