import { Router } from "express";

import userService from "../services/userService.js";
import User from "../models/User.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.post("/register", async (req, res) => {
    const userData = req.body;

    try {

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isUser = User.findOne({ email });

        if (isUser) {
            return res.status(400).json({ message: "This user is already exists" });
        }

        const user = await userService.register(userData);

        if (user) {
            return res.status(201).json({
                message: "User registered successfully"
            });
        }

        res.status(400).json({ message: "Invalid user data" });
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        res.status(400).json({ error: errorMessage });
    }

    await userService.register(userData);
})

authController.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await userService.login(email, password);

        res.status(201).json(result);
    } catch(err) {
        res.status(401).json({ message: err.message });
    }
})

export default authController;