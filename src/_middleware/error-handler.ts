import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../_helpers/api-error';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): void{
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }

  console.error(err); // Log other unexpected errors

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'An unexpected error occurred',
  });
}