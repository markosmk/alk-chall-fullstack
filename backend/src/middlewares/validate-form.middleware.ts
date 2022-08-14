import { NextFunction, Response } from 'express';
import { RequestWithUserData } from 'src/interfaces/request.interface';
import { AppError } from 'src/utils/AppError';
import { validate, object } from 'superstruct';

export const validateForm = (fields: object) => {
    return (req: RequestWithUserData, _: Response, next: NextFunction) => {
        const Schema = object({ ...fields });
        if (req.user?.id) {
            req.body.userId = req.user?.id;
        }
        const key = Object.keys(req.body || {}).length ? 'body' : 'query';
        const [error, bory] = validate(req[key] || {}, Schema);

        if (error) return next(new AppError(error.reason || error.message));

        // req[`_${key}`] = req[key];
        req[key] = bory;
        return next();

        // for any simply validation in route validateQuery(['name', 'age', 'club'])
        // for (const field of fields) {
        //     if (!req.query[field]) {
        //         // Field isn't present, end request
        //         return res.status(400).send(`${field} is missing`);
        //     }
        // }
        // next()
    };
};
