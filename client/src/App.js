import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from "./components/Landing";


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
            </Routes>
        </BrowserRouter>
    )
}

export default App;
