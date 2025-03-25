import { Router, Request, Response } from "express";
import { listUsers, getUserById } from "../user.service";

const router = Router();

// List all users
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await listUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve a user by ID
router.get("/:id", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: errorMessage });
    }
});

export default router;
