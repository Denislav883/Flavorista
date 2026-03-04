import "dotenv/config";
import express from "express";

import connectDb from "./config/connectionDb.js";
import routes from "./routes.js";

const app = express();

// Connect DB
connectDb();

// Middleware for CORS
app.use(cors());

// JSON parser
app.use(express.json());

// Body parser
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use(routes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});