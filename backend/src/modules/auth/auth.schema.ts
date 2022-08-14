import { string, refine } from 'superstruct';
import { isEmail } from 'src/utils/validation-types';

const email = refine(string(), 'Email', (value) => {
    return isEmail(value);
});

export const UserLogin = {
    email: email,
    password: string()
};
export const UserCreated = {
    name: string(),
    email: email,
    password: string()
};
export const ForgetPass = {
    email: email
};
