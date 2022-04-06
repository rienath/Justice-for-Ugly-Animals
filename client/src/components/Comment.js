import React from 'react';
import '../index.css';
import {MdModeEditOutline} from "react-icons/md";
import {RiDeleteBinFill} from "react-icons/ri";
import {DateTime} from "luxon";

/* A single comment component */
const Comment = ({comment}) => {

    // Calculate how long ago the comment was made
    const showDateDifference = () => {
        const now = DateTime.now()
        const post = DateTime.fromISO(comment.timeCreated);
        const diff = now.diff(post, ["years", "months", "days", "hours", "minutes", "seconds"])
        if (diff.years) {
            return (
                <>{diff.years + (diff.years === 1 ? ' year ago' : 'years ago')}</>
            );
        } else if (diff.months) {
            return (
                <>{diff.months + (diff.months === 1 ? ' month ago' : ' months ago')}</>
            );
        } else if (diff.days) {
            return (
                <>{diff.days + (diff.days === 1 ? ' day ago' : ' days ago')}</>
            );
        } else if (diff.hours) {
            return (
                <>{diff.hours + (diff.hours === 1 ? ' hour ago' : ' hours ago')}</>
            );
        } else if (diff.minutes) {
            return (
            <>{diff.minutes + (diff.minutes === 1 ? ' minute ago' : ' minutes ago')}</>
            );
        } else if (diff.seconds) {
            return (
                <>{diff.seconds + (diff.seconds === 1 ? ' second ago' : ' seconds ago')}</>
            );
        } else {
            return (
                <>{'Recent'}</>
            );
        }
    }

    return (
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
                        <div>
                            <button
                                className="p-1 w-fit mx-1 text-indigo-600 text-center align-middle border border-solid border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                                <MdModeEditOutline/>
                            </button>
                            <button
                                className="p-1 w-fit mx-1 text-red-500 text-center align-middle border border-solid border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300">
                                <RiDeleteBinFill/>
                            </button>
                        </div>
                    </div>
                    <div className="text-sm leading-6">
                        {comment.comment}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment;