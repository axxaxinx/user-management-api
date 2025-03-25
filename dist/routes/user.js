"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../routes/user.service");
const router = (0, express_1.Router)();
// List all users
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.listUsers)();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: "Why Error" });
    }
}));
// Retrieve a user by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ message: "Invalid ID format" });
        return;
    }
    try {
        const user = yield (0, user_service_1.getUserById)(userId);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ error: error });
    }
}));
//Create a new user
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email } = req.body;
        // Validate required fields
        if (!firstName || !lastName || !email) {
            res.status(400).json({
                error: "All fields are required"
            });
            return;
        }
        // Create and return user
        const newUser = yield (0, user_service_1.UserCreation)(firstName, lastName, email);
        res.status(201).json(newUser); // Explicit return
        return;
    }
    catch (error) {
        if (error.message.includes("already in use")) {
            res.status(409).json({ error: error.message });
            return;
        }
        console.error("Creation error:", error);
        res.status(500).json({ error: "User creation failed" });
        return;
    }
}));
exports.default = router;
