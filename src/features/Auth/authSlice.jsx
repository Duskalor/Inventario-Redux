import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiSistema } from '../../Api/ApiSistema';
const success = localStorage.getItem('success')
  ? localStorage.getItem('success')
  : false;
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;
const userId = localStorage.getItem('userId')
  ? localStorage.getItem('userId')
  : null;

export const login = createAsyncThunk('login/LoginUser', async (userAuth) => {
  const { data } = await apiSistema.post('login', userAuth);
  //console.log(data);
  localStorage.setItem('userToken', data.userToken);
  localStorage.setItem('userId', data.User.id);
  localStorage.setItem('success', data.success);
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
    localStorage.clear();
    // localStorage.removeItem('userToken');
    // localStorage.removeItem('userId');
    // localStorage.removeItem('success');
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
    //console.log(data);
    return data;
  }
);

export const authSlice = createSlice({
  name: 'Auth',
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
  extraReducers: (build) => {
    // login cases
    build
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.userToken;
        state.success = payload.success;
        state.user = payload.User;
      })
      .addCase(login.rejected, (state) => {
        state.loading = true;
      })
      // logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.userId = null;
        state.userToken = null;
        state.user = [];
      })
      .addCase(logout.rejected, (state) => {
        state.loading = true;
      })
      // getUserDetails cases
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = payload.success;
        state.user = payload.User;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.loading = true;
      });
  },

  // extraReducers: {
  //   //Login
  //   [login.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [login.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     //console.log(payload);
  //     state.userToken = payload.userToken;
  //     state.success = payload.success;
  //     state.user = payload.User;
  //   },
  //   [login.rejected]: (state) => {
  //     state.loading = false;
  //   },
  //   //Logout
  //   [logout.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [logout.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     //console.log(payload.User);
  //     state.success = payload.success;
  //     state.userId = null;
  //     state.userToken = null;
  //     state.user = [];
  //   },
  //   [logout.rejected]: (state) => {
  //     state.loading = false;
  //   },

  //   //GET USER DETAILS
  //   [getUserDetails.pending]: (state) => {
  //     state.loading = true;
  //   },
  //   [getUserDetails.fulfilled]: (state, { payload }) => {
  //     state.loading = false;
  //     //console.log(payload);
  //     state.success = payload.success;
  //     state.user = payload.User;
  //   },
  //   [getUserDetails.rejected]: (state) => {
  //     state.loading = false;
  //   },
  // },
});
export const { increment } = authSlice.actions;
