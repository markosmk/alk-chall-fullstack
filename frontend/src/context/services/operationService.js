import axios from 'axios';

const getAllOperations = () => {
  return axios.get('/operations');
};

const getOneOperation = (operationId) => {
  return axios.get('/operations/' + operationId);
};

const createOperation = (data) => {
  return axios.post('/operations', data);
};

const updateOperation = (data, operationId) => {
  return axios.put('/operations/' + operationId, data);
};

const deleteOperation = (operationId) => {
  return axios.delete('/operations/' + operationId);
};

const operationService = {
  getAllOperations,
  getOneOperation,
  createOperation,
  updateOperation,
  deleteOperation,
};

export default operationService;
