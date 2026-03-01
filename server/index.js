import express from "express";

const app = express();

// JSON parser
app.use(express.json());

// Body parser
app.use(express.urlencoded({ extended: false }));

app.listen(5000, () => console.log("Server is listening on http://localhost5000..."));