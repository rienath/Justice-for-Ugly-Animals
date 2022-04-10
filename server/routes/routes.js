import express from "express";
import {getUserStats, login, register, userDelete, userEdit} from "../controllers/user.js";
import {createComment, deleteComment, editComment, getComments} from "../controllers/comment.js";
import middleware from '../middleware/auth.js';
import {likeComment, likeNumber} from "../controllers/likes.js";
import {addItem, editItem, getAllItems} from "../controllers/shop.js";
import {addBasket, buy, deleteBasket, getBasket} from "../controllers/basket.js";

const router = express.Router();

router.post("/user/login", login);
router.post("/user/register", register);
router.get("/user/stats", middleware, getUserStats); // Get number of likes and comments made by user
router.delete("/user", middleware, userDelete); // Delete the user
router.patch("/user", middleware, userEdit); // Change user details

router.post('/comments', middleware, createComment); // Make a comment
router.get('/comments', middleware, getComments); // Get comments
router.delete('/comments/:commentID', middleware, deleteComment); // Delete a comment
router.patch('/comments', middleware, editComment); // Edit a comment

router.post('/like/:commentID', middleware, likeComment); // Like/dislike
router.get('/like/:commentID', middleware, likeNumber); // Get number of likes on a post

router.post("/shop", middleware, addItem); // Add new item
router.get("/shop", middleware, getAllItems); // Get all items
router.put("/shop", middleware, editItem); // Edit the item items
router.get("/shop/basket", middleware, getBasket); // Get items from basket
router.post("/shop/basket", middleware, addBasket); // Add one item to basket
router.delete("/shop/basket/:itemID", middleware, deleteBasket); // Delete one item from basket
router.get("/shop/basket/buy", middleware, buy); // Delete one item from basket

export default router;