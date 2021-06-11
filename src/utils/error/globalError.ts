
import { Request, Response } from "express";

const appError = require('./appError');

class GlobalError {
    err:Error;
    res:Response;
    constructor(res :Response) {
        this.err=new Error;
        this.res = res;
    }
 handleDev = () => {
    console.log(this.err)
    return new appError('Your token is invalid', 401);
};

//handle error in test
 handleTest = () => {
    console.log(this.err)
    return new appError('Your token is invalid', 401);
};
 handleProd = () => {
    console.log(this.err)
    return new appError('Your token is invalid', 401);
};
handleCastErrorDB = () => {
    console.log(this.err)
    return new appError('Your token is invalid', 401);
};
handleUniqueErrorDB = () => {
    console.log(this.err)
    return new appError('Your token is invalid', 401);
};
handleValidationErrorDB = () => {
    // const errors = Object.values(this.err.errors).map((el) => el.message);
    const message = 'zxzxz';
    return new appError(message, 422);
};
handleJsonWebTokenErrorAuth = () => {  
    console.log(this.err)
    return new appError('Your token is invalid', 401);
};
handleTokenExpiredErrorAuth = () => {
    console.log(this.err)
    return new appError('Your token is Expired', 401);
};
}

export  default function (res :Response) {

    const dError = new GlobalError(res)
    if (process.env.NODE_ENV === 'production') {
        let error = new  Error;
        if (error.name == 'CastError') error = dError.handleCastErrorDB();
        if (error.name == '11000') error = dError.handleUniqueErrorDB();
        if (error.name == 'ValidationError') error = dError.handleValidationErrorDB();
        if (error.name == 'JsonWebTokenError') error = dError.handleJsonWebTokenErrorAuth();
        if (error.name == 'TokenExpiredError') error = dError.handleTokenExpiredErrorAuth();
        dError.handleProd();
    } else if (process.env.NODE_ENV === 'development') {
        dError.handleDev();
    } else {
        dError.handleTest();
    }
}
