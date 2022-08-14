import type { Response } from 'express';
import { RequestWithUserData } from 'src/interfaces/request.interface';
import * as OperationSrv from './operation.service';
import { checkCorrectSign } from 'src/utils/checking-correct-sign';
import { checkIdParam } from 'src/utils/checking-id-params';

export type UserFindManyArgs = {
    where: {
        userId?: number | undefined;
        type?: string | undefined;
        categoryId?: number | null;
        concept?: { contains: string | null };
    };
    include?: { categories: boolean };
    orderBy?: unknown;
    take?: number;
};

const getAll = async (req: RequestWithUserData, res: Response) => {
    const userId = req.user?.id;
    const { limit, order, type, category, search } = req.query;
    // construct options object
    // ?limit=10&order=desc&type=gasto&category=1&search="in concept"
    const options: UserFindManyArgs = { where: { userId }, include: { categories: true } };
    if (limit || order || type || category || search) {
        if (limit && Number.isInteger(Number(limit))) options.take = Number(limit);
        if (order && (order === 'asc' || order === 'desc')) options.orderBy = { date: order };
        if (type && (type === 'gasto' || type === 'ingreso')) options.where.type = type;
        if (category && Number.isInteger(Number(category))) options.where.categoryId = Number(category) > 0 ? Number(category) : null;
        if (search) options.where.concept = { contains: search as string };
    }
    /**
     * La pantalla de inicio deberá mostrar el balance actual, es decir,
     * el resultante de los ingresos y gastos de dinero cargados,
     * un listado de los últimos 10 registrados.
     */
    const operations = await OperationSrv.listOperations(options);
    const balance = await OperationSrv.getBalance(userId);
    return res.json({ operations, balance });
};

const getById = async (req: RequestWithUserData, res: Response) => {
    const userId = req.user?.id;
    const id = checkIdParam(req);
    const operation = await OperationSrv.getOperation(id, userId);
    return res.json({ operation });
};

const createOne = async (req: RequestWithUserData, res: Response) => {
    const userId = req.user?.id;
    const newOperation = {
        ...req.body,
        userId,
        date: new Date(req.body.date), // convert datatime 2022-01-27 01:01:44
        amount: checkCorrectSign(req) // correct the sign amount
    };
    const operation = await OperationSrv.createOperation(newOperation);
    return res.json({ message: 'Guardado Correctamente', operation });
};

const updateOne = async (req: RequestWithUserData, res: Response) => {
    const userId = req.user?.id;
    const data = req.body;
    const id = checkIdParam(req);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...filteredData } = data; // no update type data

    // TODO not allowed update empty object
    // if(!filteredData.concept){
    //     return res.json({ message: 'Nada para Actualizar', data: null });
    // }

    const operationCurrent = await OperationSrv.getOperation(id, userId);
    if (operationCurrent) {
        filteredData.amount = checkCorrectSign(req, operationCurrent.type); // correct the sign amount
    }
    const operation = await OperationSrv.updateOperation(id, filteredData);
    return res.json({ message: 'Actualizado Correctamente', operation });
};

const deleteOne = async (req: RequestWithUserData, res: Response) => {
    // const userId = req.user?.id;
    const id = checkIdParam(req);
    // Checked if item userId is equal userId session
    const operation = await OperationSrv.deleteOperation(id);
    return res.json({ message: 'Operacion eliminada', operation });
};

export { getAll, getById, createOne, updateOne, deleteOne };
