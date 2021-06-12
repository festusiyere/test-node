
import { NextFunction, Request, Response } from "express";
import log from '../../logger'
import appError from './appError';

class GlobalError {
    err: appError;
    res: Response;
    constructor(err: appError, res: Response) {
        this.err = err;
        this.res = res;
    }
    handleCastErrorDB = () => {
        console.log('cast Error', this.err)
        return this.res.status(500).json({
            message: this.err.message
        })
    };
    handleUniqueErrorDB = () => {
        console.log('UniqeError', this.err)
        return this.res.status(500).json({
            message: this.err.message
        })
    };
    handleValidationErrorDB = () => {
        return this.res.status(422).json({
            error: this.err.message
        })
    };
    handleJsonWebTokenErrorAuth = () => {
        console.log('Jwbwebtoken', this.err)
        return this.res.status(500).json({
            message: this.err.message
        })
    };
    handleTokenExpiredErrorAuth = () => {
        console.log('Uncaught Error', this.err)
        return this.res.status(500).json({
            message: this.err.message
        })
    };
    handleUncaughtError = () => {
        return this.res.status(500).json({
            error: this.err.message
        })
    };
    handleUnauthoziedErrorDB = () => {
        const errStatus:number = this.err.statusCode || 401
        return this.res.status(errStatus).json({
            error: this.err.message
        })
    };
}

export default function (err: appError, req: Request, res: Response, next: NextFunction) {
    const handleError = new GlobalError(err, res)
    /**
     * 
     * Sort Errors first By name
     */
    //log all errors
    if (err.name == 'CastError') return handleError.handleCastErrorDB();
    /**
     * handle Unique DB Errors
     */
    if (err.name == '11000') return handleError.handleUniqueErrorDB();
    /**
     * Handle validation errors
     */
    if (err.name == 'ValidationError') return handleError.handleValidationErrorDB();
    /**
     * handle JasonWebToken Error
     */
    if (err.name == 'JsonWebTokenError') return handleError.handleJsonWebTokenErrorAuth();
    /**
     * Handle expired token
     */
    if (err.name == 'TokenExpiredError') return handleError.handleTokenExpiredErrorAuth();
    /**
     * Handle any other error
     */
    /****
     * 
     * Sort Error By Code
     * 
     * 
     */
     if (err.statusCode == 401 ||err.statusCode == 403 ) return handleError.handleUnauthoziedErrorDB();
    /**
     * handle JasonWebToken Error
     */
     if (err.statusCode == 422) return handleError.handleValidationErrorDB();
    /**
     * handle JasonWebToken Error
     */
    return handleError.handleUncaughtError();

}
