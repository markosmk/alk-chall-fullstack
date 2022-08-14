import { enums, number, optional, string } from 'superstruct';

export const OperationSchema = {
    concept: string(),
    amount: number(),
    date: string(),
    type: enums(['gasto', 'ingreso']),
    userId: optional(number()),
    categoryId: number()
};
export const OperationSchemaUpdating = {
    concept: optional(string()),
    amount: optional(number()),
    date: optional(string()),
    type: optional(enums(['gasto', 'ingreso'])),
    userId: optional(number()),
    categoryId: optional(number())
};
