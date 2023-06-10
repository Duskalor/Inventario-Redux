import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ListaProductos from './ListaProductos';
import FormNuevoProducto from './FormNuevoProducto';
import InventoryIcon from '@mui/icons-material/Inventory';
import { style } from '../style';
import { ButtonLayout } from '../../components/ButtonLayout';
import { useTheme } from '@emotion/react';

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
      <Button onClick={handleOpen}>Nuevo Producto</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box
          sx={{
            ...style,
            width: 250,
            borderRadius: 4,
            borderColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <FormNuevoProducto handleClose={handleClose} />
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button onClick={handleClose}>Cerrar</Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function LayoutProducto() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{}}>
      <ButtonLayout onClick={handleOpen}>
        <InventoryIcon sx={{ fontSize: 65 }} />
        Productos
      </ButtonLayout>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box
          sx={{
            ...style,
            width: 1250,
            borderRadius: 4,
          }}
        >
          <ListaProductos />
        </Box>
      </Modal>
    </Box>
  );
}
