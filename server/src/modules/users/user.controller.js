import userModel from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../../utils/globalErrorHandling.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { uploadImageToImgBB } from "../../../utils/imgbbUpload.js";
import { AppError } from "../../../utils/classError.js";
dotenv.config();

//==========================================USER REGISTRATION========================================================
export const userRegistration = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    let imageUrl = null;

    // check if email already exists
    const emailExist = await userModel.findOne({ email });
    if (emailExist) {
        return next(new AppError("Email already exists", 409));
    }

    // hash password
    const hashedPassword = bcrypt.hashSync(password, 10);


    // if user uploaded an image --> upload it to imgbb
    if (req.file) {
        const imageBase64 = req.file.buffer.toString('base64');
        imageUrl = await uploadImageToImgBB(imageBase64);
        console.log('Base64 length:', imageBase64.length);
    }

    // create user in DB with the image URL if available
    const newUser = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        image: imageUrl
    });

    return res.status(201).json({ message: "User registered successfully", user: firstName + " " + lastName, data: newUser });
});

//===================================================SIGN IN=========================================================
export const signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // create token
    const token = jwt.sign(
        { id: user._id, email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.status(200).json({
        message: "Logged in successfully",
        token,
        user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    });
});

//===================================== GET USER PROFILE======================================
export const userProfile = async (req, res) => {
    try {

        const user = {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            profilePicture: req.user.image,
            createdAt: req.user.createdAt
        };

        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};