import { db } from 'src/utils/db.server';
import { User } from './user.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAll = async (options: any): Promise<User[]> => {
    return db.users.findMany(options);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOne = async (options: any): Promise<User | null> => {
    return db.users.findFirst(options);
};

export const create = async (data: Omit<User, 'id'>): Promise<User> => {
    return db.users.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
};

export const update = async (id: number | undefined, data: Omit<User, 'id' | 'password'>): Promise<Omit<User, 'password'>> => {
    const { name, email } = data;
    return db.users.update({
        where: { id },
        data: {
            name,
            email
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

export const remove = async (id: number): Promise<User | null> => {
    return db.users.delete({
        where: { id }
    });
};
