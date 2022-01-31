import axios from 'axios';

const getInfoUser = (userId) => {
  return axios.get('/users/' + userId);
};

const updateUser = (data, userId) => {
  return axios.put('/users/' + userId, data);
};

const deleteUser = (userId) => {
  return axios.delete('/users/' + userId);
};

const userService = {
  getInfoUser,
  updateUser,
  deleteUser,
};

export default userService;
