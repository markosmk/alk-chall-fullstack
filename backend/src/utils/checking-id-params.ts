import { Request } from 'express';
import { AppError } from './AppError';

export const checkIdParam = (req: Request) => {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) throw new AppError(`Parametro recibido Invalido: "${id}"`, 400);
    return Number.parseInt(id, 10);
};
