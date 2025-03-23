import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { StatusCodes } from "http-status-codes";

export function validateRequest(req: Request, res: Response, next: NextFunction, schema: Schema): void {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "Validation error",
            details: error.details.map((x) => x.message),
        });
        return;
    }

    req.body = value;
    next();
}