import Likes from '../models/likes.js';
import Comments from '../models/comment.js';


/* Like a comment (create). If it was liked, dislike the comment (remove) */
export const likeComment = async (req, res) => {
    try {
        const {commentID} = req.params;
        // Check if such comment exists
        Comments.countDocuments({_id: commentID}, async function (err, commentCount) {
            // If it does not, error
            if (commentCount < 1) {
                return res.status(404).json("Comment not found")
            }
            // Count number of likes
            Likes.countDocuments({commentID}, async function (err, likesCount) {
                // If user liked it, delete (dislike) it
                Likes.deleteOne({userID: req.userID, commentID}, async function (err, deletedCount) {
                    deletedCount = deletedCount.deletedCount;
                    if (deletedCount > 0) {
                        return res.status(200).json({likes: likesCount - 1, liked: false});
                    }
                    // Otherwise, create a new like
                    await Likes.create({
                        userID: req.userID,
                        commentID: commentID,
                    })
                    return res.status(201).json({likes: likesCount + 1, liked: true});
                });
            });
        });
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Return the number of liked comments and if they have been liked by the user */
export const likeNumber = async (req, res) => {
    try {
        const {commentID} = req.params;
        // Find the comment and count the number of likes
        Likes.countDocuments({commentID: commentID}, function (err, likesCount) {
            // Also return if requesting user has liked it
            Likes.exists({userID: req.userID, commentID}, async function (err, userLiked) {
                return res.status(200).json({likes: likesCount, liked: userLiked})
            });
        });
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}