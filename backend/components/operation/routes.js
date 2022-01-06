const express = require('express');
const router = express.Router();
const operationController = require('./controller');

// routes
router.get('/', operationController.getAll); // to listed
router.get('/:id', operationController.getById); // to edit - to show data
router.post('/', operationController.createOne); // to create new
router.put('/:id', operationController.updateOne); // to action update
router.delete('/:id', operationController.deleteOne); // to action delete

module.exports = router;
