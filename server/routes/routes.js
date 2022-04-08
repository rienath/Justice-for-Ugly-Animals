import express from "express";
import {login, register} from "../controllers/user.js";
import {createComment, deleteComment, editComment, getComments} from "../controllers/comment.js";
import middleware from '../middleware/auth.js';
import {likeComment, likeNumber} from "../controllers/likes.js";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/register", register);

router.post('/comments', middleware, createComment);
router.get('/comments', middleware, getComments);
router.delete('/comments/:commentID', middleware, deleteComment);
router.patch('/comments', middleware, editComment);

router.post('/like/:commentID', middleware, likeComment);
router.get('/like/:commentID', middleware, likeNumber);

export default router;