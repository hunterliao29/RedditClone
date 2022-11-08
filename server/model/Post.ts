import { model, Schema } from "mongoose";

const PostSchema = new Schema({
    title: String,
    message: {
        type: String,
        required: true
    },
    by: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    type: {
        type: String,
        default: "post",
        enum: ["post", "comment"]
    },
    sub: {
        type: Schema.Types.ObjectId,
        ref: "subs",
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "posts"
    },
    votes: {
        up: {
            type: Number,
            default: 0,
            required: true
        },
        down: {
            type: Number,
            default: 0,
            required: true
        }
    },
    time: {
        type: Number,
        default: new Date().getTime(),
    }
})




const Post = model("posts", PostSchema);


export default Post;