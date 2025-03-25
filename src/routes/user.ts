import { Router } from "express";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { firstName, lastName, email } = req.body;

    // Validate request body
    if (!firstName || !lastName || !email) {
        return res.status(400).json({
            message: "Missing required fields: firstName, lastName, and email are required."
        });
    }

    try {
        const userRepository = getRepository(User);
        const newUser = userRepository.create(req.body);
        const results = await userRepository.save(newUser);
        return res.status(201).json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error creating user",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

// Use named export