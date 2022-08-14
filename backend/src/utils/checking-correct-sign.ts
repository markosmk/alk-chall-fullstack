import type { Request } from 'express';
// check type, if 'ingreso' or 'gasto' to check correct sign before save
// if type is 'ingreso' must be sign +, so if enter -3 or '-3' must save 3
// if type is 'gasto' must be sign -, so if enter 3 or '3', you must save -3
export const checkCorrectSign = (req: Request, typeDB?: string | null) => {
    const { type, amount } = req.body;
    const typeSelect = typeDB ? typeDB : type;
    if (
        // check if gasto sign is positive or ingreso is negative, so change sign
        (typeSelect === 'gasto' && Math.sign(amount) === 1) ||
        (typeSelect === 'ingreso' && Math.sign(amount) === -1)
    ) {
        return -amount;
    }
    return amount;
};
