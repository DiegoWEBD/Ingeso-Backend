import { Request, Response, NextFunction } from "express";
import HttpError from "./http_error";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let httpError: HttpError;

    if(err instanceof HttpError){
        httpError = err;
    } else {
        httpError = new HttpError(500, 'Error interno del servidor');
        console.log(err);

    }

    res.status(httpError.code).json({
        message: httpError.message,
    });

};

export default errorHandler;