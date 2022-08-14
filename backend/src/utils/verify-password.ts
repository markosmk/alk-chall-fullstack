import bcrypt from 'bcrypt';

export const verifyPassword = (inputPassword: string, currentPassword: string): boolean => {
    return bcrypt.compareSync(inputPassword, currentPassword);
};
