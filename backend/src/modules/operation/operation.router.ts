import { Router } from 'express';
import { isOperationOwner } from 'src/middlewares/only-owner.middleware';
import { validateForm } from 'src/middlewares/validate-form.middleware';
import { asyncHandler } from 'src/utils/async-handler';
import * as OperationController from './operation.controller';
import { OperationSchema, OperationSchemaUpdating } from './operation.schema';

const router = Router();

router.get('/', asyncHandler(OperationController.getAll)); // to listed
router.get('/:id', asyncHandler(OperationController.getById)); // to edit - to show data
router.post('/', validateForm(OperationSchema), asyncHandler(OperationController.createOne)); // to create new
router.put('/:id', isOperationOwner, validateForm(OperationSchemaUpdating), asyncHandler(OperationController.updateOne)); // to action update
router.delete('/:id', isOperationOwner, asyncHandler(OperationController.deleteOne)); // to action delete

export default router;
