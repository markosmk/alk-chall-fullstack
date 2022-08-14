import { db } from 'src/utils/db.server';
import { User } from '../user/user.type';

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return db.users.findFirst({ where: { email } });
};
export const createUser = async (data: Omit<User, 'id'>): Promise<User> => {
    return db.users.create({ data });
};
export const getUserByToken = async (tokenReset: string) => {
    return db.users.findFirst({ where: { tokenReset: tokenReset as string } });
};
export const addTokenResetUser = async (id: number, data: Omit<User, 'id' | 'name' | 'email' | 'password'>): Promise<User> => {
    return db.users.update({ where: { id }, data: { tokenReset: data.tokenReset, resetAt: data.resetAt } });
};
export const updatePassUser = async (id: number, pass: string): Promise<User> => {
    return db.users.update({ where: { id }, data: { password: pass, tokenReset: '', resetAt: '' } });
};
