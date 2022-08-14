import { Operations_type, Prisma } from '@prisma/client';

export type Operation = {
    id?: number;
    concept: string;
    amount: Prisma.Decimal;
    date: Date;
    type: Operations_type | null;
    userId: number;
    categoryId: number | null;
};
