import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from "./components/Landing";
import Main from "./components/Main";
import Profile from "./components/Profile";
import Comments from "./components/Comments";
import Shop from "./components/Shop";


const App = () => {

    // Current user
    const [user,setUser] = useState({
        _id:'',
        username:'',
        email:'',
        privilege:''
    });

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing/>}/>
                <Route path="/main" element={<Main user={user} setUser={setUser}/>}>
                    <Route path="profile" element={<Profile/>}/>
                    <Route index element={<Comments/>}/>
                </Route>
                <Route path="shop" element={<Shop/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
