import mongoose from "mongoose";
const { MONGO_URI } = process.env;

if (!MONGO_URI) throw new Error("MONGO_URI is not defined");

mongoose.connect(MONGO_URI,
    (error) => {
        if (error) console.log(error);
        else console.log("Connected to DB.");
    }
);


export default mongoose.connection;