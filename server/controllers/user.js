import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

// Login
export const login = async (req, res) => {

    const {email, password} = req.body;

    try {
        // Check if user exists
        const existingUser = await UserModel.findOne({email});
        if (!existingUser) return res.status(404).json({ message: "User not found"});
        // Check if credentials are correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        // Token
        const token = jwt.sign({
            email: existingUser.email,
            username: existingUser.username,
            privilege: existingUser.privilege,
            _id: existingUser._id}, process.env.JWT_SECRET, {expiresIn: "24h"});

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
        if (existingEmail) return res.status(400).json({ message: "User already exists" });
        if (existingLogin) return res.status(400).json({ message: "Username is taken" });

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 12);
        // Create database entry
        const result = await UserModel.create({email, username: username, password: hashedPassword});
        // Token
        const token = jwt.sign({
            email: result.email,
            username: result.username,
            privilege: result.privilege,
            _id: result._id}, process.env.JWT_SECRET, {expiresIn: "24h"});

        res.status(201).json({result: token});
    } catch (error) {
        res.status(500).json({message: "Server-side error"});
    }
};