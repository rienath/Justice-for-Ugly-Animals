import Comment from '../models/comment.js';
import {DateTime} from "luxon";

/* Create a comment */
export const createComment = async (req, res) => {
    try {
        const {comment, reply} = req.body;
        const newComment = await Comment.create({
            userID: req.userID, comment, from: req.username, timeCreated: DateTime.now(), reply: reply ? reply : '',
        })

        return res.status(201).json({
            newComment
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            err
        })
    }
}

/* Return comments */
export const getAllComments = async (req, res) => {
    try {
        const allComments = await Comment.find().sort({timeCreated: -1});
        return res.status(200).json({allComments});
    } catch (err) {
        console.log(err);
        return res.status(500).json({err});
    }
}


