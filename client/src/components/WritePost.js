import React, {useState} from 'react';
import {createComment} from "../api";

/* Component, where new post is written and submitted */
const WritePost = ({allComments,setAllComments}) => {

    const [newPost, setNewPost] = useState({
        comment:'',
    });

    // Handlers
    const handleChangeEnter = (e) => {
        setNewPost({comment: e.target.value});
    }

    const handleCommentSubmit = async() => {
        const data = await createComment(newPost);
        const temp = allComments.slice();
        temp.unshift(data.data.newComment);
        setAllComments(temp);
        //TODO: get error message if any and output the same as in login screen
        console.log(data.data);
    }

    return (
        <div className="px-2 md:px-16 pt-4 py text-gray-400">
            <div className="border border-green-200 p-2 rounded-full flex flex-row h-full bg-green-50">
                <div className="rounded-full bg-gray-600 overflow-hidden w-10 h-10">
                    {/* TODO might add avatar picture
                        <img src={Avatar} alt="" style={{filter:'invert(100%)'}} /> */}
                </div>
                <input placeholder="Write a comment" value={newPost.comment} onChange={handleChangeEnter}
                       className="px-3 overflow-hidden overscroll-contain resize-auto text-black flex-grow border border-green-150 ml-4 mr-2 rounded-md"/>
                <button onClick={handleCommentSubmit}
                    className="p-3 w-fit md:mx-2 text-indigo-600 text-center align-middle border border-solid border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                    <svg className="flex-1 w-4 h-4 fill-current align-middle" viewBox="0 0 24 24">
                        <path fill="currentcolor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default WritePost;