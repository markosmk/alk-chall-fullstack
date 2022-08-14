/* eslint-disable @typescript-eslint/no-inferrable-types */
export class AppError {
    statusCode: number;
    message: string;
    additionalInfo: string | null;
    name: string;

    constructor(message: string, statusCode = 500, additionalInfo = '') {
        // super(message);
        // Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.message = message;
        this.statusCode = statusCode;
        this.additionalInfo = additionalInfo;
        // Error.captureStackTrace(this);
    }
}
