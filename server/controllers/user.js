import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import Likes from "../models/likes.js";
import Comment from "../models/comment.js";

// Login
export const login = async (req, res) => {

    const {email, password} = req.body;

    try {
        // Check if user exists
        const existingUser = await UserModel.findOne({email});
        if (!existingUser) return res.status(404).json({message: "User not found"});
        // Check if credentials are correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        // Token
        const token = jwt.sign({
            email: existingUser.email,
            username: existingUser.username,
            privilege: existingUser.privilege,
            _id: existingUser._id
        }, process.env.JWT_SECRET, {expiresIn: "24h"});

        res.status(200).json({result: token});
    } catch (err) {
        res.status(500).json({message: "Server-side error"});
    }
};

// Register
export const register = async (req, res) => {
    const {email, username, password} = req.body;

    try {
        // Check if email or username already exist
        const existingEmail = await UserModel.findOne({email});
        const existingLogin = await UserModel.findOne({username});
        if (existingEmail) return res.status(400).json({message: "User already exists"});
        if (existingLogin) return res.status(400).json({message: "Username is taken"});

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create database entry
        const result = await UserModel.create({email, username: username, password: hashedPassword});
        // Token
        const token = jwt.sign({
            email: result.email, username: result.username, privilege: result.privilege, _id: result._id
        }, process.env.JWT_SECRET, {expiresIn: "24h"});

        res.status(201).json({result: token});
    } catch (error) {
        res.status(500).json({message: "Server-side error"});
    }
};

/* Get the number of comments user has written and liked*/
export const getUserStats = async (req, res) => {
    try {
        Likes.countDocuments({userID: req.userID}, function (err, likesCount) {
            Comment.countDocuments({userID: req.userID}, function (err, commentCount) {
                return res.status(200).json({likes: likesCount, comments: commentCount})
            });
        });
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Deleted the user and all the data that is linked to them */
export const userDelete = async (req, res) => {
    try {
        // TODO delete basket
        // Delete likes associated with the user
        await Likes.deleteMany({userID: req.userID});

        // Find comments associated with user, find replies made to those comments.
        // Delete the likes associated with those replies. Delete the replies too as parent comments are deleted.
        const allComments = await Comment.find({userID: req.userID});
        if (allComments.length > 0) { // If there is no comments, ignore this
            for (let i = 0; i < allComments.length; i++) {
                const allReplies = await Comment.find({replyID: allComments[i]._id});
                if (allReplies.length > 0) { // If there is no replies, ignore this
                    for (let j = 0; j < allReplies.length; j++) { // Iterate through replies, delete associated likes
                        await Likes.deleteMany({commentID: allReplies[j]._id});
                    }
                    await Comment.deleteMany({replyID: allComments[i]._id}); // Delete replies
                }
            }
            // Finally, delete the comments that the user has made
            await Comment.deleteMany({userID: req.userID});
        }

        // Delete user profile
        await UserModel.deleteOne({_id: req.userID});
        return res.status(200).json();
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Edit user email and/or username */
// TODO prevent updating on illegal credentials
export const userEdit = async (req, res) => {
    try {
        const body = req.body;
        // Prevent updating on existing credentials
        const emailExists = await UserModel.findOne({email: body.newEmail});
        const usernameExists = await UserModel.findOne({username: body.newUsername});
        if (emailExists) { // If email already exists, and it does not belong to us, send an error
            if (emailExists.email != req.email) {
                return res.status(400).json('User with such email already exists')
            }
        }
        if (usernameExists) {// If username already exists, and it does not belong to us, send an error
            if (usernameExists.username != req.username) {
                return res.status(400).json('User with such username already exists')
            }
        }

        // Update the user information
        try {
            const userUpdated = await UserModel.findByIdAndUpdate(req.userID, {
                username: body.newUsername, email: body.newEmail
            }, {new: true});
            await Comment.updateMany({userID: req.userID}, { // Also update username for comments
                from: body.newUsername});
            // Token
            const token = jwt.sign({
                email: userUpdated.email,
                username: userUpdated.username,
                privilege: userUpdated.privilege,
                _id: userUpdated._id
            }, process.env.JWT_SECRET, {expiresIn: "24h"});
            return res.status(200).json(token);
        } catch (err) {
            return res.status(404).json('Requesting user does not exist or your token expired')
        }
    } catch (err) {
        return res.status(500).json('Server internal error')
    }

}