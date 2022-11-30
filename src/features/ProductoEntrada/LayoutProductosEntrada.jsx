import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { style } from '../style';
import ListaProductosEntrada from './ListaProductosEntrada';
export function LayoutProductosEntrada({ NumeroDocumento }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>{NumeroDocumento}</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 600 }}>
          <h1>{NumeroDocumento}</h1>
          <ListaProductosEntrada
            handleClose={handleClose}
            codigo={NumeroDocumento}
          />
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
