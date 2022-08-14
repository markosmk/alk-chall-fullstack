import { Users_role } from '@prisma/client';

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    role?: Users_role;
    tokenReset?: string | null;
    resetAt?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
};
