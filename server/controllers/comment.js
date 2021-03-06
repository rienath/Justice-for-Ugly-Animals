import Comment from '../models/comment.js';
import {DateTime} from "luxon";
import Likes from "../models/likes.js";

/* Create a comment */
export const createComment = async (req, res) => {
    try {
        const {comment, replyID} = req.body;

        // Check if comment is longer than 1 and shorter than 500
        if (comment.length < 1) return res.status(400).json('Too short');
        if (comment.length > 500) return res.status(400).json('Too long');

        // Check if comment is not just spaces
        try {
            if (comment.replace(/\s/g, '') === "") {
                return res.status(400).json('Comment cannot be empty/spaces')
            }
        } catch (err) {/* Nothing here as error in the try actually means we are dealing with numbers */
        }

        // Make new comment. If replyID exists, get it's string
        const newComment = await Comment.create({
            userID: req.userID,
            comment: comment,
            from: req.username,
            timeCreated: DateTime.now(),
            replyID: replyID ? replyID : '',
        })

        return res.status(201).json({newComment})
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Return comments */
export const getComments = async (req, res) => {
    try {
        const allComments = await Comment.find({replyID: ''}).sort({timeCreated: -1});
        // Loop through the comments and add their replies to the request
        for (let i = 0; i < allComments.length; i++) {
            allComments[i].replies = await Comment.find({replyID: allComments[i]._id}).sort({timeCreated: -1});
        }
        return res.status(200).json({allComments});
    } catch (err) {
        return res.status(500).json('Server internal error');
    }
}


/* Delete a comment */
export const deleteComment = async (req, res) => {
    try {
        const {commentID} = req.params;
        let comment = await Comment.findOne({_id: commentID});

        // If comment not found, return 404
        if (!comment) {
            return res.status(404).json('Comment not found');
        }

        // If the user is not admin and does not own the comment, deny access
        if (req.privilege === 'user' && req.userID !== comment.userID) {
            return res.status(403).json('Access denied');
        }

        // Delete everything associated with the comment
        await Comment.deleteOne({_id: commentID}) // Delete the comment
        await Likes.deleteMany({commentID}) // Delete all likes associated with that comment
        const allComments = await Comment.find({replyID: commentID}) // Find all replies that comment had if any
        // Loop through replies and delete likes they have been associated with
        for (let i = 0; i < allComments.length; i++) {
            await Likes.deleteMany({commentID: allComments[i]._id});
        }
        await Comment.deleteMany({replyID: commentID}) // Delete all child comments if it has any
        return res.status(204).json();

    } catch (err) {
        return res.status(500).json("Server side error")
    }
}


/* Edit a comment */
export const editComment = async (req, res) => {
    const body = req.body;
    const filter = {_id: body._id};
    const comment = await Comment.findOne(filter);

    // Check if comment is longer than 1 and shorter than 500
    if (body.comment.length < 1) return res.status(400).json('Too short');
    if (body.comment.length > 500) return res.status(400).json('Too long');

    // Check if comment is not just spaces
    try {
        if (body.comment.replace(/\s/g, '') === "") {
            return res.status(400).json('Comment cannot be empty/spaces')
        }
    } catch (err) {/* Nothing here as error in the try actually means we are dealing with numbers */
    }

    // If comment not found, return 404
    if (!comment) {
        return res.status(404).json('Comment not found');
    }
    // If the user is not admin and does not own the comment, deny access
    else if (req.privilege === 'user' && req.userID !== comment.userID) {
        return res.status(403).json('Access denied');
    }

    // Update the comment
    await Comment.findOneAndUpdate(filter, {comment: body.comment});
    return res.status(204).json();
}