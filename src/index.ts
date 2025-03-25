import express from "express";
import userRoutes from "./routes/user";

const app = express();
app.use(express.json());

// Register user routes
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
