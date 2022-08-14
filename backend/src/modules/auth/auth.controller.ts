import type { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import * as AuthSrv from './auth.service';

import { AppError } from 'src/utils/AppError';
import { verifyPassword } from 'src/utils/verify-password';
import { createToken } from 'src/utils/jwt';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    // 1) check if user email exists
    const user = await AuthSrv.getUserByEmail(email);
    if (!user) throw new AppError(`No existe un usuario con el email: ${email}`, 404);
    // 2) check password with method in instance model user "validPassword"
    const password_valid = verifyPassword(password, user.password);
    if (!password_valid) throw new AppError('No coincide el pass', 401);
    // 3) create token to front session
    const token = await createToken(user.id);
    // 4) check values to response
    res.status(200).json({ message: 'Ingresado Correctamente', user, token });
};

export const register = async (req: Request, res: Response) => {
    const { name, email, password: pass } = req.body;
    // 1) Check if user exists with your email
    const userExists = await AuthSrv.getUserByEmail(email);
    if (userExists) throw new AppError(`Ya existe un usuario con el email: ${email}`, 200);
    // 2) Hash password
    const salt = await bcrypt.genSalt(10, 'a');
    const hash = bcrypt.hashSync(pass, salt);
    // 3) Create user in Db
    const dataUser = { name, email, password: hash };
    const user = await AuthSrv.createUser(dataUser);
    // 4) delete password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = user;
    res.status(201).json({ message: 'Registrado Correctamente', user: newUser });
};

export const forget = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await AuthSrv.getUserByEmail(email);
    if (!user) throw new AppError(`No existe un usuario con el email: ${email}`, 404);
    // 1) check if other token exists y el time expired
    // if(user.tokenReset && new Date().getTime() - new Date(user.resetAt as Date).getTime() > 1000 * 60 * 60 * 1){
    //     const milisecondsDiff = new Date().getTime() - new Date(user.resetAt as Date).getTime()
    //     // 3) if result is false, empty token and date
    //     await AuthSrv.addTokenResetUser(user.id, { tokenReset: '', resetAt: null });
    //     // 4) indicate to user to generate new request
    //     throw new AppError('Habias solicitado una solicitud antes, que esta pendiente, puedes volver a pedir otra en ', 404);
    // }
    // 2) generate token with crypto nodejs
    const tokenReset = crypto.randomBytes(64).toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
    // 3) save now Date() in DB column resetAt
    const userUpdated = await AuthSrv.addTokenResetUser(user.id, { tokenReset, resetAt: new Date() });
    //TODO: 4) send email with token, with time to 24hs expire
    res.status(200).json({ message: `Revisa tu Correo ${userUpdated.name}. Te enviamos un mail con un enlace para reestablecer el acceso a tu cuenta`, user: userUpdated });
};

export const reset = async (req: Request, res: Response) => {
    const { token } = req.query;
    console.log(token);
    // 1) search token in db
    const user = await AuthSrv.getUserByToken(token as string);
    if (!user) throw new AppError(`No existe el usuario para esa solicitud`, 404);
    // 2) checking if date resetAt (date) a diference now() is less at 24hs
    console.log(new Date().getTime() - new Date(user.resetAt as Date).getTime());
    if (new Date().getTime() - new Date(user.resetAt as Date).getTime() > 1000 * 60 * 60 * 1) {
        // if > 24hs
        // 3) if result is false, empty token and date
        await AuthSrv.addTokenResetUser(user.id, { tokenReset: '', resetAt: null });
        // 4) indicate to user to generate new request
        throw new AppError('El tiempo expiro, intenta haciendo una solicitud nuevamente', 404);
    }
    // 5) if token is valid, return true and allow change pass in frontpage
    res.status(200).json({ message: 'Ok', user });
};

export const resetPass = async (req: Request, res: Response) => {
    const { newpassword, token } = req.body;
    // 1) search user by token (by body or query -> aditional)
    const user = await AuthSrv.getUserByToken(token);
    if (!user) throw new AppError(`No existe un usuario para esa solicitud.`, 404);
    // 2) Hash password
    const salt = await bcrypt.genSalt(10, 'a');
    const hash = bcrypt.hashSync(newpassword, salt);
    // 3) update data user
    const userUpdated = await AuthSrv.updatePassUser(user.id, hash);
    res.status(200).json({ message: 'Cuenta actualizada', user: userUpdated });
};
