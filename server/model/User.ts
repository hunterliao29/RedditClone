import { model, Schema } from "mongoose";


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    subs: [{
        type: Schema.Types.ObjectId,
        ref: "subs"
    }],
    posts: [{
        post: {
            type: Schema.Types.ObjectId,
            ref: "posts"
        },
        vote: {
            type: Number,
            enum: [1,0,-1]
        }
    }]
})


const User = model("users", UserSchema);


export default User;