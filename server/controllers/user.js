import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
import Likes from "../models/likes.js";
import Comment from "../models/comment.js";
import validator from "email-validator";
import Basket from "../models/basket.js";

// Login and get token
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const existingUser = await UserModel.findOne({email});
        if (!existingUser) return res.status(404).json("User not found");

        // Check if credentials are correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json("Invalid credentials");

        // Create a token
        const token = jwt.sign({
            email: existingUser.email,
            username: existingUser.username,
            privilege: existingUser.privilege,
            _id: existingUser._id
        }, process.env.JWT_SECRET, {expiresIn: "24h"});

        res.status(200).json({result: token});
    } catch (err) {
        res.status(500).json("Server-side error");
    }
};

// Register
export const register = async (req, res) => {
    try {
        const {email, username, password} = req.body;

        // Check if email is valid
        if (!validator.validate(email)) return res.status(400).json("Invalid email");

        // Check if username and password are not just spaces
        try {
            if (password.replace(/\s/g, '') === "" || username.replace(/\s/g, '') === "") {
                return res.status(400).json('Username and password cannot be empty/spaces')
            }
        } catch (err) {/* Nothing here as error in the try actually means we are dealing with numbers */
        }

        // Check if password is 8-32 characters long and username is 4-12 characters long
        if (password.length < 8) return res.status(400).json("Password too short");
        if (password.length > 32) return res.status(400).json("Password too long");
        if (username.length < 4) return res.status(400).json("Username too short");
        if (username.length > 12) return res.status(400).json("Username too long");

        // Check if email or username already exist
        const existingEmail = await UserModel.findOne({email});
        const existingLogin = await UserModel.findOne({username});
        if (existingEmail) return res.status(400).json("User already exists");
        if (existingLogin) return res.status(400).json("Username is taken");

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create database entry
        const result = await UserModel.create({email, username: username, password: hashedPassword});

        // Create a token
        const token = jwt.sign({
            email: result.email, username: result.username, privilege: result.privilege, _id: result._id
        }, process.env.JWT_SECRET, {expiresIn: "24h"});

        res.status(201).json({result: token});
    } catch (error) {
        res.status(500).json("Server-side error");
    }
};

/* Get the number of comments user has written and liked */
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
        // Delete basket items associated with the user
        await Basket.deleteMany({userID: req.userID});
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
export const userEdit = async (req, res) => {
    try {
        const body = req.body;

        // If credentials are the same, return same token
        if (req.email === body.newEmail && req.username === body.newUsername) {
            return res.status(200).json(jwt.sign({
                email: req.email, username: req.username, privilege: req.privilege, _id: req._id
            }, process.env.JWT_SECRET, {expiresIn: "24h"}));
        }

        // Check if email is valid
        if (!validator.validate(body.newEmail)) return res.status(400).json("Invalid email");

        // Check if username is not just spaces
        try {
            if (body.newUsername.replace(/\s/g, '') === "") {
                return res.status(400).json('Username cannot be empty/spaces')
            }
        } catch (err) {/* Nothing here as error in the try actually means we are dealing with numbers */
        }

        // Check if email or username already exist
        if (req.email !== body.newEmail) {
            const existingEmail = await UserModel.findOne({email: body.newEmail});
            if (existingEmail) return res.status(400).json("Email is taken");
        } else if (req.username !== body.newUsername) {
            const existingLogin = await UserModel.findOne({username: body.newUsername});
            if (existingLogin) return res.status(400).json("Username is taken");
        }

        // Check if username is 4-12 characters long
        if (body.newUsername.length < 4) return res.status(400).json("Username too short");
        if (body.newUsername.length > 12) return res.status(400).json("Username too long");

        // Update the user information
        try {
            const userUpdated = await UserModel.findByIdAndUpdate(req.userID, {
                username: body.newUsername, email: body.newEmail
            }, {new: true});
            await Comment.updateMany({userID: req.userID}, { // Also update username for comments
                from: body.newUsername
            });

            // Make a token
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