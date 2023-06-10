import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { BoxContainer } from './BoxContainer';
import { ButtonLogout } from './ButtonLogout';

export const TitleSystem = ({ UserPermiso, user }) => {
  const { almacenes, loading } = useSelector((state) => state.Almacenes);
  const isSmall = useMediaQuery('(max-width:600px)');
  const NameAlmacen = almacenes.find(
    (almacen) => almacen.id === user.IdAlmacenes
  );
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: isSmall && 'column',
        textAlign: isSmall && 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <BoxContainer p={'1rem 0 1rem 1rem'} gap={2} alignItems='center'>
        <img
          src='./logo.png'
          alt='Legion Tech'
          style={{
            width: '45px',
            height: '73px',
          }}
        />
        <Typography variant='h3'>Legion Tech</Typography>
      </BoxContainer>
      <BoxContainer px={3} alignItems='center'>
        {!loading && UserPermiso ? (
          <Typography variant='h3'>
            Bienvenido {user.FullName} - {UserPermiso?.Descripcion} -&nbsp;
            {NameAlmacen?.ubicacion}
          </Typography>
        ) : (
          <Typography variant='h3'>
            <CircularProgress />
          </Typography>
        )}
      </BoxContainer>
    </Box>
  );
};
