import React, {useState} from 'react';
import '../index.css';
import {MdModeEditOutline} from "react-icons/md";
import {RiDeleteBinFill} from "react-icons/ri";
import {DateTime} from "luxon";
import {deleteComment, editComment} from "../api";
import Reply from "./Reply";

/* A single comment component */
const Comment = ({comment, allComments, setAllComments, user}) => {

    const [commentText, setCommentText] = useState(comment.comment);
    const [commentID] = useState(comment._id);
    const [editing, setEditing] = useState(false); // True if we are in editing regime
    const [replies, setReplies] = useState(comment.replies);

    // Calculate how long ago the comment was made
    const showDateDifference = () => {
        const now = DateTime.now()
        const post = DateTime.fromISO(comment.timeCreated);
        const diff = now.diff(post, ["years", "months", "days", "hours", "minutes", "seconds"])
        if (diff.years) {
            return (<>{diff.years + (diff.years === 1 ? ' year ago' : 'years ago')}</>);
        } else if (diff.months) {
            return (<>{diff.months + (diff.months === 1 ? ' month ago' : ' months ago')}</>);
        } else if (diff.days) {
            return (<>{diff.days + (diff.days === 1 ? ' day ago' : ' days ago')}</>);
        } else if (diff.hours) {
            return (<>{diff.hours + (diff.hours === 1 ? ' hour ago' : ' hours ago')}</>);
        } else if (diff.minutes) {
            return (<>{diff.minutes + (diff.minutes === 1 ? ' minute ago' : ' minutes ago')}</>);
        } else if (diff.seconds) {
            return (<>{diff.seconds + (diff.seconds === 1 ? ' second ago' : ' seconds ago')}</>);
        } else {
            return (<>{'Recent'}</>);
        }
    }

    // Handlers
    // Delete the comment
    const handleCommentDelete = async () => {
        const data = await deleteComment(commentID);
        const temp = allComments.slice();
        // Delete the comment
        const arr = temp.filter((comment) => comment._id !== commentID);
        setAllComments(arr);
        // TODO: get error messages
        console.log(data.data);
    }

    // Edit the comment
    const handleCommentEdit = async () => {
        // TODO get error message and keep old comment if did not work
        // Mystery
        if (editing) {
            const data = await editComment({_id: comment._id, comment: commentText});
        }
        setEditing(!editing);
    }

    // Change the comment value
    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    }


    return (<div className="pt-1 pb-1.5">
        <div className="border border-green-200 bg-green-50 py-2 rounded-md">
            <div className="flex flex-row items-center">
                <div className="px-4">
                    <button className="w-10 h-10 bg-yellow-200 align-middle hover:bg-yellow-300 duration-300">
                        <h5 className="text-black text-sm text-center"><b>{comment.rating}</b></h5>
                    </button>
                </div>

                <div className="w-full">
                    <div className="flex justify-between">
                        <h5 className="text-black text-sm mb-1"><b>{comment.from}</b> {showDateDifference()} </h5>
                        {// Show edit and delete buttons only the user who made the comment
                            user._id === comment.userID || user.privilege === 'admin' ? <div>
                                <button onClick={handleCommentEdit}
                                        className="p-1 w-fit mx-1 text-indigo-600 text-center align-middle border border-solid border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                                    <MdModeEditOutline/>
                                </button>
                                <button onClick={handleCommentDelete}
                                        className="p-1 w-fit mx-1 text-red-500 text-center align-middle border border-solid border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300">
                                    <RiDeleteBinFill/>
                                </button>
                            </div> : <></>}
                    </div>

                    <div className="pt-0.5">
                        {editing ? <textarea className="text-sm w-full leading-6" onChange={handleCommentChange}
                                             value={commentText}/> : <div className="text-sm w-full leading-6">
                            {commentText}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        {comment.replyID === '' ? <div className="pl-16 md:pl-24">
            {/* If this is slave comment, it will have replyID, and we won't need to display replies*/}
            <Reply replyID={comment._id} replies={replies} setReplies={setReplies}/>
            <div className="py-4">
                {/* Send replies as comments as we want child comments to update in the same way */}
                {replies.map((reply) => (<Comment key={reply._id} comment={reply} allComments={replies}
                                                  setAllComments={setReplies} user={user}/>))}
            </div>
        </div> : <></>}
    </div>)
}

export default Comment;