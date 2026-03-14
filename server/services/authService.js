import bcrypt from "bcrypt";
import "dotenv/config";

import User from "../models/User.js";
import { generateAuthToken } from "../utils/tokenUtils.js";

export default {
    async register({ username, email, password }) {
        const user = await User.create({ username, email, password });

        const token = generateAuthToken(user);

        return {
            _id: user.id,
            email:user.email,
            accessToken:token
        };
    },
    async login({ email, password }) {
        const user = await User.findOne({ email });

        if(!user) {
            throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid) {
            throw new Error("Invalid email or password");
        }

        const token = generateAuthToken(user);

        return {
            _id: user.id,
            email: user.email,
            accessToken: token
        };
    }
}