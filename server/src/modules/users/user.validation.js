import joi from "joi"


//REGISTERATION
export const registerValidation = {
    body: joi.object({
        firstName: joi.string().min(3).max(15).required().messages({
            "any.required": "First Name is required",
            "string.min": "First Name is too short",
        }),
        lastName: joi.string().min(3).max(15).required().messages({
            "any.required": "Last Name is required",
            "string.min": "Last Name is too short",
        }),
        email: joi.string().email().required().messages({
            "any.required": "email is required",
        }),
        password: joi.string().pattern(new RegExp(/^.{8,}$/)).required().messages({
            "string.pattern.base": "Password must be at least 8 characters",
            "any.required": "Password is required"
        }),
    })
}

//SIGN IN
export const signinValidation = {
    body: joi.object({
        email: joi.string().email().required().messages({
            "any.required": "email is required",
        }),
        password: joi.string().pattern(new RegExp(/^.{8,}$/)).required().messages({
            "string.pattern.base": "Password must be at least 8 characters",
            "any.required": "Password is required"
        }),
    })
}


