import axios from 'axios';

// export const apiSistema = axios.create({
//   baseURL: 'http://192.168.0.21:3500/api/',
// });

export const apiSistema = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

apiSistema.interceptors.request.use((req) => {
  if (localStorage.getItem('userToken')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('userToken')}`;
  }
  return req;
});

apiSistema.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const token = localStorage.getItem('userToken');

    if (
      token &&
      (error.response.status === 401 || error.response.status === 500)
    ) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);
