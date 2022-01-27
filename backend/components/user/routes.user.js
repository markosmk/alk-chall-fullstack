const express = require('express');
const router = express.Router();
const { getAll, getById, updateOne, deleteOne } = require('./controller.user');

// routes
router.get('/', getAll); // to listed
router.get('/:id', getById); // to edit - to show data
router.put('/:id', updateOne); // to action update
router.delete('/:id', deleteOne); // to action delete

module.exports = router;
