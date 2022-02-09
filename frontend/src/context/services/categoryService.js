import axios from 'axios';

const getAllCategories = (query = '') => {
  return axios.get('/categories' + query);
};

const getOneCategory = (categoryId) => {
  return axios.get('/categories/' + categoryId);
};

const createCategory = ({ name }) => {
  return axios.post('/categories', { name });
};

const updateCategory = ({ name }, categoryId) => {
  return axios.put('/categories/' + categoryId, { name });
};

const deleteCategory = (categoryId) => {
  return axios.delete('/categories/' + categoryId);
};

const categoryService = {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};

export default categoryService;
