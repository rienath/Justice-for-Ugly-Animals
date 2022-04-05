import React from 'react';
import {useNavigate} from "react-router-dom";
import '../index.css';


const Header = ({user}) => {

    const navigate = useNavigate();

    // Handlers
    // Hamburger menu on small screen
    let collapse = document.querySelector("#navbar-collapse");
    const handleHamburger = () => {
        collapse.classList.toggle("hidden");
        collapse.classList.toggle("flex");
    };

    // Redirects
    const handleLogo = (e) => {
        e.preventDefault();
        navigate('/main')
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        navigate('/')
    }

    const handleShop = (e) => {
        e.preventDefault();
        navigate('/shop')
    }

    // Logout
    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
    }

    return (
        <nav className="bg-white py-2 md:py-4">
            <div className="container px-4 mx-auto md:flex md:items-center">

                <div className="flex justify-between items-center">
                    <a href="" onClick={handleLogo} className="font-bold text-xl text-indigo-600">Love for the Uglies</a>
                    <button
                        className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 hover:opacity-50 md:hidden"
                        onClick={handleHamburger}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>

                <div className="hidden justify-around items-end md:flex flex-row md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
                    {
                        user.username ?
                            <>
                                <a href=""
                                   className="p-2 lg:px-4 md:mx-2 text-center hover:opacity-50 transition-colors duration-300 mt-1 md:mt-0 md:ml-1">{user.username}</a>
                                <a href="" onClick={handleLogOut}
                                   className="p-2 lg:px-4 md:mx-2 text-red-500 text-center border border-solid border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">Log out</a>
                            </>
                            :
                            <a href="" onClick={handleSignUp}
                                className="p-2 lg:px-4 md:mx-2 text-indigo-600 text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">Sign up</a>
                    }
                    <a href="#" onClick={handleShop}
                       className="p-3 w-fit md:mx-2 text-indigo-600 text-center align-middle border border-solid border-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1">
                        <svg className="flex-1 w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path
                                d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Header;