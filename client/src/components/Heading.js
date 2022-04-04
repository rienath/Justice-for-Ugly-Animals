import React from 'react';
import {useNavigate} from "react-router-dom";

const Heading = ({user}) => {

    const navigate = useNavigate();

    return (
        <div>
            {
                user ?
                    <p>Heading. User logged in is: {user.username}</p>
                    :
                    <p>No user</p>
            }
            <button onClick={() => navigate('/shop')}>Go to Shop</button>
        </div>
    )
}

export default Heading;