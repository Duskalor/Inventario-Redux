import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;
const success = localStorage.getItem('success')
  ? localStorage.getItem('success')
  : false;
const userId = localStorage.getItem('userId')
  ? localStorage.getItem('userId')
  : null;

export const login = createAsyncThunk('login/LoginUser', async (userAuth) => {
  const { data } = await apiSistema.post('login', userAuth);
  //console.log(data);
  localStorage.setItem('userToken', data.userToken);
  localStorage.setItem('userId', data.User.id);
  localStorage.setItem('success', data.User.success);
  // console.log(localStorage, data);

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
    localStorage.removeItem('userId');
    localStorage.removeItem('success');
    //console.log(localStorage);
    const { data } = await apiSistema.get('logout', config);
    return data;
  }
);
export const getUserDetails = createAsyncThunk(
  'get/getUserDetails',
  async (_, { getState }) => {
    const { Auth } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${Auth.userToken}`,
      },
    };
    const { data } = await apiSistema.get(
      `user/details/${Auth.userId}`,
      config
    );
    //console.log(localStorage);
    return data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: [],
    userId,
    success,
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
      state.user = payload.User;
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
      //console.log(payload.User);
      state.success = payload.success;
      state.user = [];
    },
    [logout.rejected]: (state) => {
      state.loading = false;
    },

    //GET USER DETAILS
    [getUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      //console.log(payload);
      state.success = payload.success;
      state.user = payload.User;
    },
    [getUserDetails.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { increment } = authSlice.actions;
