import React, {useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Header from "./Header";
import decode from "jwt-decode";

const Main = ({user, setUser}) => {

    const navigate = useNavigate();

    // If user not logged in, take them to the landing page
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
        } else {
            const decodedToken = decode(token);
            setUser(decodedToken);
        }
    }, []);


    return (<div>
        <Header user={user}/>
        <Outlet/>
    </div>)
}

export default Main;