import jwt from 'jsonwebtoken';
import config from 'src/config/constants';
import { IVerifiedUserType } from 'src/interfaces/verified-user.interface';

export const createToken = (id: number, expiresIn: number = 60 * 60 * 3): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        if (!id) return reject(new Error('data invalid to create token'));
        if (!config.jwt_secret) reject(new Error('jwt secret not configured'));
        return jwt.sign(
            { id },
            config.jwt_secret,
            {
                //TODO add type
                // issuer: config.server.token.issuer,
                // algorithm: 'HS256',
                // algorithm: 'RS256', //2024bit
                expiresIn
            },
            (err: unknown, token: string | PromiseLike<string | undefined> | undefined) => {
                if (err) return reject(err);
                resolve(token);
            }
        );
    });
};

export const verifyToken = (token: string): Promise<IVerifiedUserType> => {
    return new Promise((resolve, reject) => {
        if (!token) reject(new Error('token required'));
        if (!config.jwt_secret) reject(new Error('jwt secret not configured'));
        jwt.verify(token, config.jwt_secret, (err: unknown, decoded: unknown) => {
            if (err) return reject(err);
            resolve(decoded as IVerifiedUserType);
        });
    });
};
