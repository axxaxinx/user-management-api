import { StatusCodes } from "http-status-codes"; // HTTP status codes
import { ApiError } from "../_helpers/api-error"; // Error handler
import express, { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { validateRequest } from "../_middleware/validate-request";
import { Role } from "../_helpers/role";
import { userService } from "./user.service";

const router = express.Router();

// Routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

export default router;

// Route functions
async function getAll(req: Request, res: Response, next: NextFunction) {
	try {
		const users = await userService.getAll();
		res.status(StatusCodes.OK).json(users);
	} catch (error) {
		if (error instanceof ApiError) {
			next(error);
		} else {
			const err = error as Error;
			next(
				new ApiError(
					StatusCodes.INTERNAL_SERVER_ERROR,
					err.message || "An unexpected error occurred"
				)
			);
		}
	}
}

async function getById(req: Request, res: Response, next: NextFunction) {
	try {
		const user = await userService.getById(req.params.id);
		if (!user) {
			throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
		}
		res.status(StatusCodes.OK).json(user);
	} catch (error) {
		if (error instanceof ApiError) {
			next(error);
		} else {
			const err = error as Error;
			next(
				new ApiError(
					StatusCodes.INTERNAL_SERVER_ERROR,
					err.message || "An unexpected error occurred"
				)
			);
		}
	}
}

async function create(req: Request, res: Response, next: NextFunction) {
	try {
		await userService.create(req.body);
		res
			.status(StatusCodes.CREATED)
			.json({ message: "User created successfully" });
	} catch (error) {
		const err = error as Error;
		next(
			new ApiError(StatusCodes.BAD_REQUEST, err.message || "Failed to create user")
		);
	}
}

async function update(req: Request, res: Response, next: NextFunction) {
	try {
		await userService.update(req.params.id, req.body);
		res.status(StatusCodes.OK).json({ message: "User updated successfully" });
	} catch (error) {
		const err = error as Error;
		next(
			new ApiError(StatusCodes.BAD_REQUEST, err.message || "Failed to update user")
		);
	}
}

async function _delete(req: Request, res: Response, next: NextFunction) {
	try {
		await userService.delete(req.params.id);
		res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
	} catch (error) {
		const err = error as Error;
		next(
			new ApiError(
				StatusCodes.INTERNAL_SERVER_ERROR,
				err.message || "Failed to delete user"
			)
		);
	}
}

// Validation Schemas
function createSchema(req: Request, res: Response, next: NextFunction) {
	const schema = Joi.object({
		title: Joi.string().required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		role: Joi.string().valid(Role.Admin, Role.User).required(),
		email: Joi.string().email().required(),
		username: Joi.string().min(3).max(30).required(),
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
	});
	validateRequest(req, res, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction) {
	const schema = Joi.object({
		title: Joi.string().allow(""),
		firstName: Joi.string().allow(""),
		lastName: Joi.string().allow(""),
		role: Joi.string().valid(Role.Admin, Role.User).allow(""),
		email: Joi.string().email().allow(""),
		username: Joi.string().min(3).max(30).allow(""),
		password: Joi.string().min(6).allow(""),
		confirmPassword: Joi.string().valid(Joi.ref("password")).allow(""),
	}).with("password", "confirmPassword");
	validateRequest(req, res, next, schema);
}