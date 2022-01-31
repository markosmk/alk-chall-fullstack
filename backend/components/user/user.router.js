const express = require('express');
const router = express.Router();
const { getAll, getById, updateOne, deleteOne } = require('./user.controller');

// middlewares
const { onlyOwner } = require('../../middlewares/onlyAuthor');

// routes
router.get('/', getAll); // to listed
router.get('/:id', onlyOwner, getById); // to edit - to show data
router.put('/:id', onlyOwner, updateOne); // to action update
router.delete('/:id', onlyOwner, deleteOne); // to action delete

module.exports = router;
