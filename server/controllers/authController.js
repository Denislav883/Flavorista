import { Router } from "express";

import authService from "../services/authService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await authService.register({ username, email, password });

        if (user) {
            return res.status(201).json(user);
        }

        return res.status(400).json({ message: "Invalid user data" });
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        return res.status(400).json({ error: errorMessage });
    }
})

authController.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const result = await authService.login({ email, password });

        return res.status(200).json(result);
    } catch(err) {
        return res.status(401).json({ message: err.message });
    }
})

export default authController;