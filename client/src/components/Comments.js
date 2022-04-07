import React, {useEffect, useState} from 'react';
import WritePost from "./WritePost";
import Comment from "./Comment";
import {getComments} from "../api";

/* Component with the comments section */
const Comments = ({user}) => {

    const [allComments, setAllComments] = useState([]);

    // Get the comments
    useEffect(() => {
        getComments().then((res) => setAllComments(res.data.allComments))
            .then((err) => console.log(err));
    }, []);

    return (<>
        <WritePost allComments={allComments} setAllComments={setAllComments}/>
        <div className="px-2 md:px-16 pt-4 round-full text-black">
            {allComments.map((comment) => (<Comment key={comment._id} comment={comment} allComments={allComments}
                                                    setAllComments={setAllComments} user={user}/>))}
            {/*TODO Replies might need to go inside the individual comments*/}
        </div>
    </>)
}

export default Comments;