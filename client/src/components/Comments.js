import React, {useEffect, useState} from 'react';
import WritePost from "./WritePost";
import Comment from "./Comment";
import {getComments} from "../api";
import toast, {Toaster} from "react-hot-toast";

/* Component with the comments section (all comments) */
const Comments = ({user}) => {

    const [allComments, setAllComments] = useState([]);


    // Get all comments
    useEffect(() => {
        getComments().then((res) => setAllComments(res.data.allComments))
            .catch((err) => toast.error(err.response.data));
    }, []);


    // Display new comment input and all comments
    return (<><Toaster/>
        <div className="h-screen pattern-isometric pattern-indigo-50 pattern-bg-transparent pattern-opacity-80">
            <WritePost allComments={allComments} setAllComments={setAllComments}/>
            <div className="px-2 md:px-16 pt-4 round-full text-black">
                {allComments.map((comment) => (<Comment key={comment._id} comment={comment} allComments={allComments}
                                                        setAllComments={setAllComments} user={user}/>))}
            </div>
        </div>
    </>)
}

export default Comments;