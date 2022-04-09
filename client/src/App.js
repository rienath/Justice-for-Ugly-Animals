// TODO login max size (backend and front handling)
// TODO password min size

import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from "./components/Landing";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Comments from "./components/Comments";
import Shop from "./components/Shop";


const App = () => {

    // Current user
    const [user, setUser] = useState({
        _id: '',
        username: '',
        email: '',
        privilege: ''
    });

    useEffect(() => {
        console.log(1);
    }, [user, setUser]);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing/>}/>
                <Route path="/main" element={<Main user={user} setUser={setUser}/>}>
                    <Route path="profile" element={<Profile user={user} setUser={setUser}/>}/>
                    <Route index element={<Comments user={user}/>}/>
                </Route>
                <Route path="shop" element={<Shop user={user}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
