import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";
import userRoutes from "./routes/user";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123*",
    database: "user_management",
    entities: ["src/entities/*.ts"],  
    synchronize: true,                      
    logging: true,
    migrationsRun: true
});

const app = express();
const APP_PORT = 3000;

app.use(express.json());
app.use("/users", userRoutes);

async function startServer() {
    try {
        // Initialize database connection
        await AppDataSource.initialize();
        console.log("Connected to MySQL");

        // Start Express server and store the instance
        const server = app.listen(APP_PORT, () => {
            console.log(`Server running on http://localhost:${APP_PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

startServer();

