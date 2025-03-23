import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ApiError extends Error {
    public statusCode: number;

    constructor(statusCode: number, message?: string) {
        super(message || getReasonPhrase(statusCode)); // Default message if none is provided
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
    }
}