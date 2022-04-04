import React, {useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Heading from "./Heading";
import decode from "jwt-decode";

const Main = ({user,setUser}) => {

    const navigate = useNavigate();

    // If user not logged in, take them to the landing page
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(!token) {
            navigate('/');
        } else {
            const decodedToken = decode(token);
            console.log(decodedToken);
            setUser(decodedToken);
        }
    },[]);

    return (
        <div>
            <Heading user={user}/>
            <Outlet/>
        </div>
    )
}

export default Main;