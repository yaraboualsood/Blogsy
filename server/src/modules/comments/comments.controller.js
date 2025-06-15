import commentModel from "../../../db/models/comments.model.js";
import postModel from "../../../db/models/post.model.js";
import { asyncHandler } from "../../../utils/globalErrorHandling.js";

//==================================ADD COMMENT==================================================
export const createComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;

    const comment = await commentModel.create({
        content,
        author: req.user._id,
        post: postId
    });

    //push it in the comments array in the post collection
    await postModel.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    res.status(201).json({ message: "Comment added", comment });
});

//==========================READ ALL COMMENTS ON A POST==================================================
export const getCommentsByPost = asyncHandler(async (req, res) => {
    const comments = await commentModel.find({ post: req.params.postId }).populate("author", "firstName lastName");
    res.status(200).json({ comments });
});

//==================================EDIT COMMENT==================================================
export const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const updated = await commentModel.findOneAndUpdate(
        { _id: commentId, author: req.user._id },
        { content: req.body.content },
        { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Comment not found or not authorized" });

    res.status(200).json({ message: "Comment updated", updated });
});

//==================================DELETE COMMENT==================================================
export const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const deleted = await commentModel.findOneAndDelete({ _id: commentId, author: req.user._id });

    if (!deleted) return res.status(404).json({ message: "Comment not found or not authorized" });

    // remove comment ID from post.comments
    await postModel.updateOne({ comments: commentId }, { $pull: { comments: commentId } });

    res.status(200).json({ message: "Comment deleted" });
});
