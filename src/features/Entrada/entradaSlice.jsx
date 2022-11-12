import { createSlice } from '@reduxjs/toolkit';

export const entradaSlice = createSlice({
  name: 'templace',
  initialState: {
    counter: 10,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },
});
export const { increment } = entradaSlice.actions;
