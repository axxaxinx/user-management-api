import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import userRoutes from "./routes/user";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/users", userRoutes);

// Database connection
createConnection()
    .then(() => {
        console.log(" Connected to MySQL");
        app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error(" Database connection failed:", error);
        process.exit(1);
    });
