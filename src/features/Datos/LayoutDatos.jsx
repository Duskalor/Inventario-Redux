import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormEditDatos from './FormEditDatos';
import { CircularProgress, Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import { useSelector } from 'react-redux';
import { style } from '../style';
export default function LayoutDatos() {
  const [open, setOpen] = React.useState(false);
  const { pending } = useSelector((state) => state.Datos);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // ;

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <BusinessIcon sx={{ fontSize: 60 }} />
        Datos
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          {!pending ? (
            <FormEditDatos handleClose={handleClose} />
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Modal>
    </div>
  );
}
