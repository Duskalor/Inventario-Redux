import { createSlice } from '@reduxjs/toolkit';

export const productosSlice = createSlice({
  name: 'Productos',
  initialState: {
    counter: 10,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },
});
export const { increment } = productosSlice.actions;
