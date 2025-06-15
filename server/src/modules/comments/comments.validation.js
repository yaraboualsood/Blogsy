import joi from "joi";

// CREATE 
export const createCommentValidation = {
  params: joi.object({
    postId: joi.string().length(24).hex().required().messages({
      "any.required": "Post ID is required",
      "string.length": "Post ID must be 24 characters",
      "string.hex": "Post ID must be a valid hex string",
    }),
  }),
  body: joi.object({
    content: joi.string().min(1).required().messages({
      "string.empty": "Comment content cannot be empty",
      "any.required": "Content is required",
    }),
  }),
};

//UPDATE
export const updateCommentValidation = {
  body: joi.object({
    content: joi.string().min(1).required().messages({
      "string.empty": "Content cannot be empty",
      "any.required": "Content is required",
    }),
  }),
};
