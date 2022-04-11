// TODO when 1 comment or like, remove 's'
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {deleteUser, getUserStats, updateUser} from "../api";
import decode from "jwt-decode";
import toast, {Toaster} from "react-hot-toast";

const Profile = ({user, setUser}) => {

    const navigate = useNavigate();

    const [edit, setEdit] = useState(false);
    const [deleteProfile, setDeleteProfile] = useState(false);
    const [credentials, setCredentials] = useState({username: '', email: ''});
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState(0)

    // Set comments and likes counts
    useEffect(() => {
        getUserStats().then((res) => {
            setLikes(res.data.likes);
            setComments(res.data.comments);
        });
    }, []);

    // Set username and email when they are changed
    useEffect(() => {
        setCredentials({username: user.username, email: user.email});
    }, [user]);

    // Click handlers
    const handleEdit = async (e) => {
        e.preventDefault();
        if (edit) { // If editing has finished, send a call
            await updateUser({newUsername: credentials.username, newEmail: credentials.email}).then(async (data) => {
                localStorage.setItem("token", data.data);
                const decodedToken = decode(data.data);
                await setUser(decodedToken);
                setEdit(!edit);
            })
                .catch((err) => {
                    toast.error(err.response.data)
                });
        } else {
            setEdit(!edit);
        }
    }

    const handleDelete = (e) => {
        e.preventDefault();
        // Only delete when the button was pressed for the second time (confirmation)
        // TODO error handling
        if (deleteProfile) {
            deleteUser().then((res) => {
                localStorage.clear(); // Delete token
                navigate('/');
            });
        }
        setDeleteProfile(true);
    }

    // Change handlers
    const handleUsernameChange = (e) => {
        setCredentials({...credentials, username: e.target.value});
    }
    const handleEmailChange = (e) => {
        setCredentials({...credentials, email: e.target.value});
    }

    // Do not make new line on enter
    const handleEnter = (e) => {
        if (e.key === 'Enter') e.preventDefault()
    }

    return (<div
        className="mx-auto px-4 pattern-isometric pattern-indigo-50 pattern-bg-transparent pattern-opacity-80 h-full min-h-screen">
        <Toaster/>
        <div className="flex flex-col min-w-0 bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6 pt-2 pb-16">
                <div className="flex flex-row justify-end">
                    <div className="w-full">
                        <div className="flex justify-start lg:px-12 py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block tracking-wide">{comments}</span>
                                <span className="text-sm">Comments</span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block tracking-wide">{likes}</span>
                                <span className="text-sm">Likes</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-end lg:px-12 self-center">
                        <div className="py-6 px-0.5 md:px-3 mt-3.5 md:mt-0">
                            {edit ? <button onClick={handleEdit}
                                            className="text-white bg-green-500 hover:bg-green-700 font-bold text-xs px-1.5 md:px-4 py-2 rounded outline-none mb-1 ease-linear duration-150"
                                            type="button">FINISH EDITING
                            </button> : <button onClick={handleEdit}
                                                className="text-white bg-indigo-600 hover:bg-indigo-900 font-bold text-xs px-1.5 md:px-4 py-2 rounded outline-none mb-1 ease-linear duration-150"
                                                type="button">EDIT PROFILE
                            </button>}
                        </div>
                        <div className="py-6 px-0.5 md:px-3 mt-3.5 md:mt-0">
                            {deleteProfile ? <button onClick={handleDelete}
                                                     className="text-white bg-black hover:bg-red-900 font-bold text-xs px-1.5 md:px-4 py-2 rounded outline-none mb-1 ease-linear duration-150"
                                                     type="button"> ARE YOU SURE?
                            </button> : <button onClick={handleDelete}
                                                className="text-white bg-red-500 hover:bg-red-800 font-bold text-xs px-1.5 md:px-4 py-2 rounded outline-none mb-1 ease-linear duration-150"
                                                type="button"> DELETE PROFILE
                            </button>}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    {edit ? <>
                            <textarea onChange={handleUsernameChange}
                                      className="text-4xl font-semibold text-center leading-normal"
                                      value={credentials.username} onKeyPress={handleEnter}/>
                        <textarea onChange={handleEmailChange}
                                  className="mt-10 text-center" value={credentials.email} onKeyPress={handleEnter}/>
                    </> : <>
                        <h3 className="text-4xl font-semibold leading-normal">{credentials.username}</h3>
                        <div className="mt-10">{credentials.email}</div>
                    </>}
                </div>
            </div>
        </div>
    </div>)
}

export default Profile;