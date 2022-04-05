import React from 'react';
import Header from "./Header";

const Shop = ({user,setUser}) => {

    return (
        <div>
            {/* // TODO if we randomly open page, login won't be there by default */}
            <Header user={user}/>
            <p>
                Shop
            </p>
        </div>
    )
}

export default Shop;