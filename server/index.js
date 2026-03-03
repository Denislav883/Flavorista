import "dotenv/config";
import express from "express";

import connectDb from "./config/connectionDb.js";

const app = express();

// Connect DB
connectDb();

// JSON parser
app.use(express.json());

// Body parser
app.use(express.urlencoded({ extended: false }));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});