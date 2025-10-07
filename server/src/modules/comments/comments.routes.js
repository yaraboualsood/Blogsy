import { Router } from "express";
import * as CC from "./comments.controller.js";
import { auth } from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import * as CV from "./comments.validation.js";
const router = Router({ mergeParams: true });

//==================================ADD COMMENT==================================================
router.post("/", auth(), validation(CV.createCommentValidation), CC.createComment);

//===============================READ ALL COMMENTS ON A POST==================================================
router.get("/", CC.getCommentsByPost);

//==================================EDIT COMMENT==================================================
router.put("/:commentId", auth(), validation(CV.updateCommentValidation), CC.updateComment);

//==================================DELETE COMMENT==================================================
router.delete("/:commentId", auth(), CC.deleteComment);

export default router;
