import { Router, Request, Response } from "express";
import { listUsers, getUserById, UserCreation, deleteUser } from "../routes/user.service";

const router = Router();

// List all users
router.get("/", async (req: Request, res: Response) => {
    try {
        const users = await listUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "Why Error" });
    }
});

// Retrieve a user by ID
router.get("/:id", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid ID format" });
      return
    }

    try {
        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error:'User not found' });
    }
});
//Create a new user
router.post("/", async (req: Request, res: Response) => {
  try {
      const { firstName, lastName, email } = req.body;
      
      // Validate required fields
      if (!firstName || !lastName || !email) {
           res.status(400).json({
              error: "All fields are required"
          });
          return
      }

      // Create and return user
      const newUser = await UserCreation(firstName, lastName, email);
      res.status(201).json(newUser); // Explicit return
      return

  } catch (error) {
      if (error.message.includes("already in use")) {
          res.status(409).json({ error: error.message });
          return
      }
      console.error("Creation error:", error);
      res.status(500).json({ error: "User creation failed" });
      return
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const result = await deleteUser (Number(req.params.id));
      res.status(200).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Deletion Failed";
      res.status(404).json({ error: message });
    }
    })
export default router;
