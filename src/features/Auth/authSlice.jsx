import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

export const login = createAsyncThunk('login/LoginUser', async (userAuth) => {
  const { data } = await apiSistema.post('login', userAuth);
  console.log(data);
  localStorage.setItem('userToken', data.userToken);

  return data;
});
export const logout = createAsyncThunk(
  'Logout/LogoutUser',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    localStorage.removeItem('userToken');
    console.log(Auth.userToken);
    const { data } = await apiSistema.get('logout', config);
    console.log(data);
    return data;

    // const { data } = await apiSistema.post('logout', config);
    // console.log(data);
    // return data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: [],
    success: false,
    userToken,
    error: null,
    loading: false,
  },
  reducers: {
    increment: (state /* action */) => {
      state.counter += 1;
    },
  },
  extraReducers: {
    //Login
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      //console.log(payload);
      state.userToken = payload.userToken;
      state.success = payload.success;
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
    //Logout
    [logout.pending]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload.success);
      state.success = payload.success;
    },
    [logout.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = authSlice.actions;
