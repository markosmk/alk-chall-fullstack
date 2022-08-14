import { db } from 'src/utils/db.server';
import { Operation } from './operation.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const listOperations = async (options: any): Promise<Operation[]> => {
    return db.operations.findMany(options);
};

export const getBalance = async (userId: number | undefined): Promise<unknown> => {
    return db.operations.groupBy({
        by: ['type'],
        where: { userId },
        _sum: {
            amount: true
        }
    });
};

export const getOperation = async (id: number, userId: number | undefined): Promise<Operation | null> => {
    return db.operations.findFirst({
        where: { id, userId }
    });
};

export const createOperation = async (operation: Omit<Operation, 'id'>): Promise<Operation> => {
    return db.operations.create({
        data: operation
    });
};

export const updateOperation = async (id: number, operation: Omit<Operation, 'id'>): Promise<Operation> => {
    const { concept, amount, categoryId } = operation;
    return db.operations.update({
        where: { id },
        data: {
            concept,
            amount,
            // type,
            categoryId
        }
    });
};

export const deleteOperation = async (id: number): Promise<Operation | null> => {
    return db.operations.delete({
        where: { id }
    });
};
