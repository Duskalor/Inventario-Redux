import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormNuevoCliente from './FormNuevoCliente';
import ListaCliente from './ListaCliente';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
      <Button onClick={handleOpen}>Nuevo Cliente</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 200 }}>
          <FormNuevoCliente handleClose={handleClose} />
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
export default function LayoutClientes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
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
        <AccountCircleIcon sx={{ fontSize: 60 }} />
        Clientes
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 500 }}>
          <ListaCliente />
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
