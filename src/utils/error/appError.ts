export default class AppError extends Error {
    message : any;
    statusCode : Number;
    status: String;
    isOperational : Boolean;
    constructor(message :any, statusCode :Number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
