const express = require('express');
const router = express.Router();
const {
  getAll,
  getById,
  createOne,
  updateOne,
  deleteOne,
} = require('./category.controller');

// routes
router.get('/', getAll); // to listed
router.get('/:id', getById); // to edit or to show data with all operations
router.post('/', createOne); // to create new
router.put('/:id', updateOne); // to action update
router.delete('/:id', deleteOne); // to action delete

module.exports = router;
