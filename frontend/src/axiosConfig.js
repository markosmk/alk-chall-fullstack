import axios from 'axios';
import { store } from './context/store';
import { logout, setLogin } from './context/reducers/authSlice';

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.timeout = 300000; // seteo el timeout de los requests
// axios.defaults.withCredentials = true; // para permitir solo en mi ruta, definir cors in backend

// handle requests axios
axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      if (localStorage.getItem('user')) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        if (token) {
          console.log('tengo el token', token);
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// handle response axios
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // const originalRequest = error.config;
    console.log('estoy recibiendo un error en la respuesta', error.config);

    // Prevent infinite loops
    // if (
    //   error.response.status === 401 &&
    //   originalRequest.url === originalRequest.baseURL + '/token/refresh'
    // ) {
    //   // window.location.href = '/login/';
    //   return Promise.reject(error);
    // }

    // if status 401 intentamos refresh token or logout session
    if (
      error.response.data.error === 'Unauthorized' &&
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      // const refreshToken = localStorage.getItem('refresh_token');
      console.log('recibi un estado 401, enviar a login');
      store.dispatch(logout());
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

if (localStorage.getItem('user')) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  store.dispatch(setLogin());
} else {
  store.dispatch(logout());
}
