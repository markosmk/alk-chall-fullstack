import type { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { StructError } from 'superstruct';

/**
 * Custom error handler to standardize error objects returned to the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleError: ErrorRequestHandler = (err: TypeError | AppError, req: Request, res: Response, next: NextFunction) => {
    const typeCustomError: boolean = err.constructor.name === 'NodeError' || err.constructor.name === 'SyntaxError' ? false : true;

    // If you want to set a custom error
    if (err instanceof StructError) {
        return res.status(400).json({ response: 'Error', error: { message: err.message }, data: null }); // Superstruct's verbose message
    }

    let customError = err;

    if (!(err instanceof AppError)) {
        customError = new AppError('Oh no, this is embarrasing. We are having troubles my friend', 500, err.message);
    }
    // we are not using the next function to prvent from triggering
    // the default error-handler. However, make sure you are sending a
    // response to client to prevent memory leaks in case you decide to
    // NOT use, like in this example, the NextFunction .i.e., next(new Error())
    // next();
    return res.status((customError as AppError).statusCode || 500).json({
        response: 'Error',
        error: {
            ...customError,
            type: typeCustomError === false ? 'UnhandledError' : err.constructor.name,
            path: req.path,
            statusCode: (customError as AppError).statusCode || 500,
            message: (customError as AppError).message
        },
        data: null
    });
};

export default handleError;
