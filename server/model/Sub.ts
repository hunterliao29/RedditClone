import { Schema, model } from "mongoose";

const SubSchema = new Schema({
    url : {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
});

const Sub = model("subs", SubSchema);

export default Sub;