import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { style } from '../style';
import GenerarReporte from './GenerarReporte';

export default function LayoutReports() {
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
          top: '70%',
          left: '50%',
          pt: 1,
          transform: 'translate(-50%, -0.50%)',
        }}
      >
        <AssignmentIcon sx={{ fontSize: 45 }} />
        Reportes
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box
          sx={{
            ...style,
            width: 320,
            borderRadius: 4,
          }}
        >
          <GenerarReporte handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
