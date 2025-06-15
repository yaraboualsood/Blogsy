import joi from "joi";

// CREATE 
export const postValidation = {
  body: joi.object({
    title: joi.string().max(100).required().messages({
      "any.required": "Title is required",
      "string.max": "Title must not exceed 100 characters",
    }),
    content: joi.string().required().messages({
      "any.required": "Content is required",
    }),
    category: joi.string().required().messages({
      "any.required": "Category is required",
    }),
  }),
};


// EDIT POST (fields optional but validated if present)
// export const updatePostValidation = {
//   body: joi.object({
//     title: joi.string().min(3).max(100).messages({
//       "string.min": "Title must be at least 3 characters",
//     }),
//     content: joi.string().min(10).messages({
//       "string.min": "Content must be at least 10 characters",
//     }),
//   }).min(1).messages({
//     "object.min": "At least one field must be provided to update",
//   }),
// };