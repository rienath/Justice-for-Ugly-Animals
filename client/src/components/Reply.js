import React, {useState} from 'react';
import {BsFillReplyFill} from "react-icons/bs";
import {createComment} from "../api";
/* Component, where the reply is written and submitted */
const Reply = ({replyID, replies, setReplies}) => {

    const [newReply, setNewReply] = useState({
        comment: '', replyID: replyID,
    });

    // Handlers
    const handleChangeEnter = (e) => {
        setNewReply({...newReply, comment: e.target.value});
    }

    const handleReplySubmit = async () => {
        const data = await createComment(newReply);
        const temp = replies.slice();
        temp.unshift(data.data.newComment);
        setReplies(temp);
        setNewReply({...newReply, comment: ''}); // Reset comment on submit
        // TODO: get error message if any and output the same as in login screen
    }

    return (<div className="pt-2 text-gray-400 flex flex-row">
        <input placeholder="Write a reply..." value={newReply.comment} onChange={handleChangeEnter}
               onKeyPress={e => { // Handle pressing enter
                   if (e.key === 'Enter') {
                       handleReplySubmit().then(r => {
                       });
                   }
               }}
               className="px-3 overflow-hidden overscroll-contain resize-auto text-black flex-grow border border-green-150 mr-2 rounded-full"/>
        <button onClick={handleReplySubmit}
                className="p-2.5 w-fit md:mx-2 text-indigo-600 text-center align-middle border border-solid border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300">
            <BsFillReplyFill/>
        </button>
    </div>)
}

export default Reply;