import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { appError } from '../utils/error';
import { AnyRecord } from 'dns';

const hasRole = (...roles: string[]) => {

    return (req: Request, res: Response, next: NextFunction) => {
        
        const user = get(req, 'user');
        if (!roles.includes(user.role)) {
            console.log(user.role)
            return next();
            return next(new appError('Permission Denied', 419));
        }
        console.log('unauthenticated access attempt')
        next();
    };
};

export default hasRole;
