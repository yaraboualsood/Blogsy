import { Router } from "express";
import * as PC from "./post.controller.js";
import { auth } from "../../middleware/auth.js";
import upload from "../../middleware/multer.js";
import { validation } from "../../middleware/validation.js";
import * as PV from "./post.validation.js";


const router = Router();


// ============================CREATE POST==============================
router.post("/", auth(), upload.single("image"), validation(PV.postValidation), PC.createPost);

// ==================================READ ALL POSTS==============================
router.get("/", PC.getAllPosts);
// ==================================READ SINGLE POST==============================
router.get("/:id", PC.getPostById);

// ========================READ ALL POSTS FOR A SPECIFIC USER ===========================
router.get("/user/:userId", PC.getPostsByUser);

// =================================EDIT POST =============================================
router.put("/:postId", auth(), upload.single("image"), PC.updatePost);

// ===================================DELETE POST =========================================
router.delete("/:postId", auth(), PC.deletePost);

export default router;
