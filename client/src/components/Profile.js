import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Profile = ({user}) => {

    const navigate = useNavigate();

    const [edit, setEdit] = useState(false);
    const [deleteProfile, setDeleteProfile] = useState(false);
    const [credentials, setCredentials] = useState({username: user.username, email: user.email});

    // Click handlers
    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(!edit);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        if (deleteProfile) {
            console.log();
        }
        setDeleteProfile(true);
    }

    // Change handlers
    const handleUsernameChange = (e) => {
        setCredentials({username: e.target.value});
    }
    const handleEmailChange = (e) => {
        setCredentials({email: e.target.value});
    }

    return (<div className="mx-auto px-4">
        <div className="flex flex-col min-w-0 bg-white w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6 pt-2 pb-16">
                <div className="flex flex-row justify-end">
                    <div className="w-full">
                        <div className="flex justify-start lg:px-12 py-4 lg:pt-4 pt-8">
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block tracking-wide">22</span>
                                <span className="text-sm">Comments</span>
                            </div>
                            <div className="mr-4 p-3 text-center">
                                <span className="text-xl font-bold block tracking-wide">10</span>
                                <span className="text-sm">Likes</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-end lg:px-12 self-center">
                        <div className="py-6 px-0.5 md:px-3 mt-3.5 md:mt-0">
                            {edit ? <button onClick={handleEdit}
                                            className="text-white bg-green-600 hover:bg-green-900 font-bold text-xs px-1.5 md:px-4 py-2 rounded outline-none mb-1 ease-linear duration-150"
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
                            <textarea onchange={handleUsernameChange}
                                      className="text-4xl font-semibold text-center leading-normal">{credentials.username}</textarea>
                        <textarea onchange={handleEmailChange}
                                  className="mt-10 text-center">{credentials.email}</textarea>
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