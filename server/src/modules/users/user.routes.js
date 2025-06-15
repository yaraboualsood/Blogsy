import { Router } from "express";
import * as UC from "./user.controller.js"
import { validation } from "../../middleware/validation.js";
import * as UV from "./user.validation.js";
import upload from "../../middleware/multer.js";
import { auth } from "../../middleware/auth.js";

const router = Router()


//USER REGISTRATION
router.post('/register', upload.single('image'), validation(UV.registerValidation), UC.userRegistration);

//USER SIGN IN
router.post('/login', validation(UV.signinValidation), UC.signIn)

//GET USER PROFILE
router.get('/profile',auth() , UC.userProfile )


export default router