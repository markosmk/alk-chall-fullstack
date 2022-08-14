import type { Request, Response } from 'express';
import { RequestWithUserData } from 'src/interfaces/request.interface';
import * as UserSrv from './user.service';
import { checkIdParam } from 'src/utils/checking-id-params';
import { AppError } from 'src/utils/AppError';

/************* Only Admin *******************/
async function getAll(_req: Request, res: Response) {
    const users = await UserSrv.getAll({});
    res.json({ users });
}

async function createOne(req: Request, res: Response) {
    const user = await UserSrv.create(req.body);
    res.status(201).json({ message: 'Usuario Creado Correctamente', user });
}
/************* Only Admin *******************/

async function getById(req: RequestWithUserData, res: Response) {
    const userId = req.user?.id;

    const { operations, categories } = req.query;
    const options = { where: { id: userId }, include: { operations: false, categories: false } };
    if (operations || categories) {
        if (operations) options.include.operations = true;
        if (categories) options.include.categories = true;
    }

    const user = await UserSrv.getOne(options);
    return res.json({ user });
}

async function updateOne(req: RequestWithUserData, res: Response) {
    const userId = req.user?.id;
    console.log(userId);
    // if (userId !== +req.params.id) throw new AppError('no eres el usuario en session');
    const user = await UserSrv.update(userId, req.body);
    res.json({ message: 'Actualizado Correctamente', user });
}

async function deleteOne(req: RequestWithUserData, res: Response) {
    const userId = req.user?.id;
    const id = checkIdParam(req);
    // check if is the same id
    if (id !== userId) throw new AppError('No es posible continuar con la peticion.');
    const user = await UserSrv.remove(userId);
    res.json({ message: 'Usuario eliminado', user });
}

export { getAll, getById, createOne, updateOne, deleteOne };
