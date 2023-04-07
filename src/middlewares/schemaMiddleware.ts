import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ObjectSchema } from "joi";

export function validacaoSchema<T>(schema: ObjectSchema<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.details.map((detail) => detail.message));
        }
        next();
    };
}