import React, {useEffect, useState} from 'react';
import '../index.css';
import {useNavigate} from 'react-router-dom';
import * as api from "../api";

const Landing = () => {

    // States
    const initialFormState = {
        email : '',
        username : '',
        password : ''
    };
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Handlers
    // If register, send entire form. If login, omit email
    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent refreshing
        if(isRegister) {
            api.register(formData)
                .then(({data}) => {
                    localStorage.setItem("token",data.result);
                    navigate('/main');
                })
                .catch((err) => {
                    console.log(err);
                    setError(err.response.data.message);
                })
        } else {
            api.login({email: formData.email, password: formData.password})
                .then(({data}) => {
                    localStorage.setItem("token",data.result);
                    navigate('/main');
                })
                .catch((err) => {
                    console.log(err);
                    setError(err.response.data.message);
                })
        }
    };
    // For changing between login/register forms
    const handleToggle = () => {
        setIsRegister((prev) => !prev);
    };
    // Update state on every keystroke
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // If user logged in, take them to main page
    useEffect(() => {
        const token = localStorage.getItem("token");

        if(token) {
            navigate('/main');
        }
    },[]);

    return (
        <div className="pattern-isometric pattern-indigo-50 pattern-bg-transparent pattern-opacity-80">
            <main className="flex md:h-screen">
                <section className="container m-auto space-y-16 pb-12 md:pb-0">
                    <div className="max-w-3xl mx-auto text-center md:text-left md:flex md:space-x-3 space-y-14 pt-12 md:space-y-4 md:pt-0">
                        <h1 className="text-6xl font-extrabold leading-none space-y-16">
                            Love for the Uglies
                        </h1>

                        {
                            error &&
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                 role="alert">
                                <strong className="font-bold">Error! </strong>
                                <span className="block sm:inline">{error}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20" onClick={() => setError('')}><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                </span>
                            </div>
                        }

                        <form className="space-y-4 md:space-y-4 px-12 px-24 md:pb-0 pb-1" onSubmit={handleSubmit}>
                            {isRegister &&
                                <input
                                    className="w-full p-2 bg-pink-50 rounded-md border border-gray-700 focus:border-blue-700"
                                    placeholder="Username" required type="text" name="username" onChange={handleChange}/>
                            }
                            <input
                                className="w-full p-2 bg-pink-50 rounded-md border border-gray-700 focus:border-blue-700"
                                placeholder="E-mail" required type="email" name="email" onChange={handleChange}/>
                            <input className="w-full p-2 bg-pink-50 rounded-md border border-gray-700 "
                                   placeholder="Password"
                                   type="password" name="password" required onChange={handleChange}/>
                            <button
                                className="w-full p-2 bg-gray-50 rounded-md font-bold text-gray-900 border border-gray-700" type="submit">Submit</button>
                            <div>
                                <p className="select-none cursor-pointer font-semibold text-sky-700 float-left px-1" onClick={handleToggle}>{isRegister ? 'Register' : 'Login'}</p>
                            </div>

                        </form>
                    </div>
                    <p className="max-w-3xl text-xl font-light mx-auto text-left px-10 md:px-0">
                        We are a society which tries to raise the profile of the <b>ugly</b> animals
                        of the world. We believe that fluffy, cute creatures of the world,
                        such as the giant panda, get far too much attention in the modern media.
                        Creatures like the naked mole rat, the spiny lumpsucker fish and the jumping spider deserve much
                        more attention! Of course, <b>ugly</b> is subjective and might apply to lots of animals, too,
                        but definitely not pandas, and blob fish are now considered passé, too.
                    </p>

                    <button className="flex m-auto p-3 bg-gray-50 rounded-full font-bold text-gray-900 border-gray-700 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                        <p>🔥🔥🔥 BUY OUR MERCH 🔥🔥🔥</p>
                    </button>

                </section>
            </main>
        </div>
    )
}

export default Landing;