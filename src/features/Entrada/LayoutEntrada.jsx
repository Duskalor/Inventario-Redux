import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListaEntradas from './ListaEntradas';
import { style } from '../style';

export function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
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
        <Box sx={{ ...style, width: 200 }}>
          {/* <FormNuevoPermiso handleClose={handleClose} /> */}
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutEntrada() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Entradas</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 1050 }}>
          <ListaEntradas />
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}