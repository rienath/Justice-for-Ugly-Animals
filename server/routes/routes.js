import express from "express";
import {login, register} from "../controllers/user.js";
import {createComment, getAllComments} from "../controllers/comment.js";
import middleware from '../middleware/auth.js';

const router = express.Router();

router.post("/user/login", login);
router.post("/user/register", register);
router.post('/comments', middleware, createComment);
router.get('/comments', middleware, getAllComments);

export default router;