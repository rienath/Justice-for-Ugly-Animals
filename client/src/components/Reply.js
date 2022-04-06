import React, {useState} from 'react';
import {BsFillReplyFill} from "react-icons/bs";
import {createComment} from "../api";

/* Component, where the reply is written and submitted */
const Reply = (replyID) => {

    const [newReply, setNewReply] = useState({
        comment: '',
        reply: replyID,
    });

    // Handlers
    const handleChangeEnter = (e) => {
        setNewReply(e.target.value);
    }

    const handleReplySubmit = async() => {
        console.log(newReply);
        const {data} = await createComment(newReply);
        console.log(data);
    }

    return (
        <div className="pt-4 text-gray-400 flex flex-row">
            <input placeholder="Write a reply" value={newReply.comment} onChange={handleChangeEnter} className="px-3 overflow-hidden overscroll-contain resize-auto text-black flex-grow border border-green-150 mr-2 rounded-full" />
            <button className="p-2.5 w-fit md:mx-2 text-indigo-600 text-center align-middle border border-solid border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                <BsFillReplyFill/>
            </button>
        </div>
    )
}

export default Reply;