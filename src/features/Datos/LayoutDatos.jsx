import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import FormEditDatos from './FormEditDatos';
import { CircularProgress } from '@mui/material';
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
      <Button onClick={handleOpen}>Datos De la Empresa</Button>
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
