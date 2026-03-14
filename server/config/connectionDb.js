import mongoose from "mongoose";
import 'dotenv/config';

const connectDb = async () => {

    try {
        const MONGO_URI = process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI);

        console.log("Connected successfully.");
    } catch(error) {
        console.error("Error connecting to MongoDB", error);
    }
}

export default connectDb;