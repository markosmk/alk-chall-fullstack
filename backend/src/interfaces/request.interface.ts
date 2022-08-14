import type { Request } from 'express';

export interface RequestWithUserData extends Request {
    user?: {
        id: number;
        role: string;
    };
}
