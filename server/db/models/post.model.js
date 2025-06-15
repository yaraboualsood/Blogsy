import { Schema, model, Types } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
        required: true,
    },
    author: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    comments: [
        {
            type: Types.ObjectId,
            ref: "Comment",
        }
    ]
}, {
    timestamps: true,
    versionKey: false,
});

const postModel = model("Post", postSchema);
export default postModel;
