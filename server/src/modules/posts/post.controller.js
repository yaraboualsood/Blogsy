import postModel from "../../../db/models/post.model.js";
import userModel from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import { uploadImageToImgBB } from "../../../utils/imgbbUpload.js";

// ============================CREATE POST==============================
export const createPost = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }

    const imageBase64 = req.file.buffer.toString("base64");
    const imageUrl = await uploadImageToImgBB(imageBase64);
    console.error(imageBase64.slice(0, 100));
    const post = await postModel.create({
        title,
        content,
        category,
        image: imageUrl,
        author: req.user._id,
    });
    const populatedPost = await post.populate("author", "firstName lastName");

    res.status(201).json({ message: "Post created", post: populatedPost });
});


// ==================================READ ALL POSTS==============================
export const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await postModel.find().populate("author", "firstName lastName");
    res.status(200).json({ posts });
});



//! ==================================READ SINGLE POST==============================
export const getPostById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await postModel.findById(id)
        .populate("author", "firstName lastName")
        .populate({
            path: "comments",
            populate: {
                path: "author", // If your comments have an author ref
                select: "firstName lastName"
            }
        });

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
});


// ========================READ ALL POSTS FOR A SPECIFIC USER ===========================
export const getPostsByUser = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    // check if the user exists
    const userExists = await userModel.findById(userId);
    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }

    // fetch posts
    const posts = await postModel.find({ author: userId });

    if (!posts.length) {
        return res.status(200).json({ message: "This user has not created any posts yet.", posts: [] });
    }

    res.status(200).json({ posts });
});

// =================EDIT POST =============================================
export const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { title, content, category } = req.body;

    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;

    // handle new image if provided
    if (req.file) {
        const imageBase64 = req.file.buffer.toString("base64");
        const imageUrl = await uploadImageToImgBB(imageBase64);
        updateData.image = imageUrl;
    }

    const updated = await postModel.findOneAndUpdate(
        { _id: postId, author: req.user._id },
        updateData,
        { new: true }
    ).populate("author");

    if (!updated) {
        return res.status(404).json({ message: "Post not found or not authorized" });
    }

    res.status(200).json({ message: "Post updated", updated });
});


// ===================================DELETE POST =========================================
export const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const deleted = await postModel.findOneAndDelete({ _id: postId, author: req.user._id });

    if (!deleted) return res.status(404).json({ message: "Post not found or not authorized" });

    res.status(200).json({ message: "Post deleted" });
});