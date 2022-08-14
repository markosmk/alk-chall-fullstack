import { Router } from 'express';
import { asyncHandler } from 'src/utils/async-handler';
import * as userController from './user.controller';
import { onlyAdmin, onlyOwner } from 'src/middlewares/only-owner.middleware';
import { UserCreatedByAdmin } from './user.schema';
import { validateForm } from 'src/middlewares/validate-form.middleware';

const router = Router();

// routes
router.get('/', onlyAdmin, asyncHandler(userController.getAll)); // only admin
router.post('/', onlyAdmin, validateForm(UserCreatedByAdmin), asyncHandler(userController.createOne)); // only admin
router.get('/:id', onlyOwner, asyncHandler(userController.getById));
router.put('/:id', onlyOwner, asyncHandler(userController.updateOne));
router.delete('/:id', onlyOwner, asyncHandler(userController.deleteOne));

export default router;
