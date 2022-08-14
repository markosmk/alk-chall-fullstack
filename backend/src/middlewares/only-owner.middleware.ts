import { NextFunction, Response } from 'express';
import { RequestWithUserData } from 'src/interfaces/request.interface';
import { getOperation } from 'src/modules/operation/operation.service';
import { AppError } from 'src/utils/AppError';
import { checkIdParam } from 'src/utils/checking-id-params';

const onlyOwner = (req: RequestWithUserData, res: Response, next: NextFunction) => {
    const id = checkIdParam(req);
    // check is same user session
    if (req.user && req.user.id !== id) throw new AppError('No tienes permiso para acceder este recurso, contacta al administrador', 401);
    next();
};

const onlyAdmin = (req: RequestWithUserData, _res: Response, next: NextFunction) => {
    // if (req.user && req.user.role !== 'admin') throw new AppError('No tienes permiso para acceder este recurso, contacta al administrador', 401);
    next();
};

const isOperationOwner = async (req: RequestWithUserData, _res: Response, next: NextFunction) => {
    try {
        const id = checkIdParam(req);
        const userId = req.user?.id;
        const operationIsMine = await getOperation(id, userId);
        // const authorized = req.operation && req.operation.userId !== req.user?.id;
        if (!operationIsMine) throw new AppError('No tienes permiso para acceder a este recurso, contacta al administrador', 401);
        next();
    } catch (error) {
        next(error);
    }
};

export { onlyOwner, onlyAdmin, isOperationOwner };
