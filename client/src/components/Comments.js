import React, {useEffect, useState} from 'react';
import WritePost from "./WritePost";
import Comment from "./Comment";
import Reply from "./Reply";
import {getAllComments} from "../api";

/* Component with the comments section */
const Comments = () => {

    const [allComments,setAllComments] = useState([]);

    // Get the comments
    useEffect(() => {
        getAllComments().then((res) => setAllComments(res.data.allComments))
            .then((err) => console.log(err));
    },[]);
    console.log(allComments);

    return (
        <>
        <WritePost allComments={allComments} setAllComments={setAllComments}/>
            <div className="px-2 md:px-16 pt-4 round-full text-black">
                {
                    allComments.map((comment) => (
                        <Comment key={comment._id} comment={comment}/>
                    ))
                }
                {/*TODO Replies might need to go inside the individual comments*/}
                <div className="pl-16 md:pl-24">
                    <Reply replyID={6}/>
                    <div className="pt-4">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments;