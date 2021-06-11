import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import Ticket fro
const  hasRole = (...roles : string[]) => {
    return (req: Request,
            res: Response,
             next: NextFunction) => {
            const user = get(req, "user");
            if (!roles.includes(user.role)) {
                return res.sendStatus(403);
            }
        next();
    };
};

export default hasRole;
