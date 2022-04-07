import Comment from '../models/comment.js';
import {DateTime} from "luxon";

/* Create a comment */
export const createComment = async (req, res) => {
    try {
        const {comment, replyID} = req.body;

        // Make new comment. If replyID exists, get it's string
        const newComment = await Comment.create({
            userID: req.userID,
            comment: comment,
            from: req.username,
            timeCreated: DateTime.now(),
            replyID: replyID ? replyID : '',
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
export const getComments = async (req, res) => {
    try {
        const allComments = await Comment.find({replyID: ''}).sort({timeCreated: -1});
        // Loop through the comments and add their replies to the request
        for (let i = 0; i < allComments.length; i++) {
            allComments[i].replies = await Comment.find({replyID: allComments[i]._id}).sort({timeCreated: -1});
        }
        return res.status(200).json({allComments});
    } catch (err) {
        console.log(err);
        return res.status(500).json({err});
    }
}


/* Delete a comment */
export const deleteComment = async (req, res) => {
    try {
        const {commentID} = req.params;
        let comment = await Comment.findOne({_id: commentID});

        // If comment not found, return 404
        if (!comment) {
            return res.status(404).json({message: 'Comment not found'});
        }

        // If the user is not admin and does not own the comment, deny access
        if (req.privilege === 'user' && req.userID !== comment.userID) {
            console.log('!');
            return res.status(403).json({message: 'Access denied'});
        }

        // Delete
        await Comment.deleteOne({_id: commentID})
        await Comment.deleteMany({replyID: commentID}) // Delete all child comments if it has any
        return res.status(204).json();

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            err
        })
    }
}


/* Edit a comment */
export const editComment = async (req, res) => {
    const body = req.body;
    const filter = {_id: body._id};
    const comment = await Comment.findOne(filter);

    // If comment not found, return 404
    if (!comment) {
        return res.status(404).json({message: 'Comment not found'});
    }
    // If the user is not admin and does not own the comment, deny access
    else if (req.privilege === 'user' && req.userID !== comment.userID) {
        return res.status(403).json({message: 'Access denied'});
    }
    // If new comment is empty
    else if (body.comment === '') {
        return res.status(400).json({message: 'Comment cannot be empty'});
    }

    // Update the comment
    await Comment.findOneAndUpdate(filter, {comment: body.comment});
    console.log(body.comment);
    return res.status(204).json({});
}