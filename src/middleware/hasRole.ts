import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { AnyRecord } from 'dns';

const hasRole = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = get(req, 'user');

        const userId = get(req, 'user._id');


        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: 'Permission Denied' });
        }
        next();
    };
};

export default hasRole;
