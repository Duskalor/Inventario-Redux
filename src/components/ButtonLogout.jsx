import React from 'react';
import { logout } from '../features/Auth/authSlice';
import { useDispatch } from 'react-redux';
import { BoxContainer } from './BoxContainer';
import { Button } from '@mui/material';

export const ButtonLogout = () => {
  const dispatch = useDispatch();
  return (
    <BoxContainer pt={'0.5rem'}>
      <Button variant='contained' onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </BoxContainer>
  );
};
