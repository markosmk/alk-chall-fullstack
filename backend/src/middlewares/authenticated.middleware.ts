import type { NextFunction, Response } from 'express';
import { RequestWithUserData } from 'src/interfaces/request.interface';
import { IVerifiedUserType } from 'src/interfaces/verified-user.interface';
import { AppError } from 'src/utils/AppError';
import { verifyToken } from 'src/utils/jwt';

/**
 * Control to check if user is authenticated with json web token
 *
 * @param req Request object provided by Express
 * @param _ Response object provided by Express
 * @param next NextFunction function provided by Express
 * @returns
 */
export const authenticated = async (req: RequestWithUserData, _: Response, next: NextFunction) => {
    try {
        // const accessToken = req.cookies['access-token']; // por cookies
        // const headToken = req.headers['x-access-token']; // api node
        const authorization = <string>req.headers['authorization'];
        const token: string | undefined = authorization?.replace('Bearer ', '');
        if (!token) throw new AppError('No se puede procesar la solicitud requerida', 403, 'Token Undefined');

        const validToken: IVerifiedUserType = await verifyToken(token);
        if (!validToken) throw new AppError('No se puede procesar la solicitud requerida', 403, 'Token Invalido');
        // console.log(validToken);
        req.user = validToken; // true or false;
        return next();
    } catch (error: unknown) {
        return next(error);
    }
};
