import axios from 'axios';

const register = (name, email, password) => {
  return axios.post('/auth/register', {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post('/auth/login', { email, password }).then(({ data }) => {
    if (data) {
      const user = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      };
      if (data.token) {
        localStorage.setItem('user', JSON.stringify({ user, token: data.token }));
      }
      return user;
    }
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
