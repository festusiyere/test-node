import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';
import { get } from 'lodash';
import { createUser, findAndUpdate, findUser ,findUsers} from './admin.service';
import asyncError from '../../utils/error/asyncError';
import { appError } from '../../utils/error';

export const create = asyncError(async (req: Request, res: Response, next: NextFunction) => {
    const checkUser = await findUser({ email: req.body.email });

    if (checkUser) return next(new appError(`${req.body.email} is already registerd`, 422));
    const user = await createUser(req.body);
    const data = omit(user.toJSON(), 'password');
    return res.status(201).json({
        data
    });
});
/**
 * Get User Detail
 */
export const getUser = asyncError(async (req: Request, res: Response, next: NextFunction) => {
    const _id = get(req, 'params.userId');

    const data = await findUser({ _id });
    return res.status(200).json({
        data
    });
});
/**
 * Get All User
 */
export const getAllUser = asyncError(async (req: Request, res: Response, next: NextFunction) => {
    const data = await findUsers({});
    return res.status(200).json({
        data
    });
});
/**
 * Update user Record
 */
export const update = asyncError(async (req: Request, res: Response, next: NextFunction) => {
    const _id = get(req, 'params.userId');
    const data = await findAndUpdate({ _id }, req.body, { new: true });
    return res.status(200).json({
        data
    });
});
/**
 * Delete User Record
 */
export const userDelete = asyncError(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'ok'
    });
});
