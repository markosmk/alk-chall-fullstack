import { string, refine, optional } from 'superstruct';
import { isEmail } from 'src/utils/validation-types';

const email = refine(string(), 'Email', (value) => {
    return isEmail(value);
});

export const UserCreatedByAdmin = {
    name: optional(string()),
    email: email,
    password: string()
};
