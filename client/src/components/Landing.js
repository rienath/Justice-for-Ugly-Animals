import React, {useEffect, useState} from 'react';
import '../index.css';
import {useNavigate} from 'react-router-dom';
import * as api from "../api";
import toast, {Toaster} from 'react-hot-toast';

const Landing = () => {

    const initialFormState = {email: '', username: '', password: ''};
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const navigate = useNavigate();


    // Register/login handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isRegister) { // Register user
            api.register(formData)
                .then(({data}) => {
                    localStorage.setItem("token", data.result);
                    navigate('/main');
                })
                .catch((err) => {
                    toast.error(err.response.data)
                })
        } else { // Login user
            api.login({email: formData.email, password: formData.password})
                .then(({data}) => {
                    localStorage.setItem("token", data.result);
                    navigate('/main');
                })
                .catch((err) => {
                    toast.error(err.response.data)
                })
        }
    };

    // For changing between login/register forms
    const handleToggle = () => {
        setIsRegister((prev) => !prev);
    };

    // Handle text update
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    // If user logged in, take them to main page
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate('/main');
    }, []);


    return (<div
        className="h-full min-h-screen pattern-isometric pattern-indigo-50 pattern-bg-transparent pattern-opacity-80">
        <Toaster/>
        <main className="flex md:h-screen">
            <section className="container m-auto space-y-16 pb-12 md:pb-0 ">
                <div
                    className="max-w-3xl mx-auto text-center md:text-left md:flex md:space-x-3 space-y-14 pt-12 md:space-y-4 md:pt-0">
                    <h1 className="text-6xl font-extrabold leading-none space-y-16">
                        Love for the Uglies
                    </h1>
                    <form className="space-y-4 md:space-y-4 px-12 px-24 md:pb-0 pb-1" onSubmit={handleSubmit}>
                        {isRegister && <input
                            className="w-full p-2 bg-pink-50 rounded-md border border-gray-700 focus:border-blue-700"
                            placeholder="Username" required type="text" name="username"
                            onChange={handleChange}/>}
                        <input
                            className="w-full p-2 bg-pink-50 rounded-md border border-gray-700 focus:border-blue-700"
                            placeholder="E-mail" required type="email" name="email" onChange={handleChange}/>
                        <input className="w-full p-2 bg-pink-50 rounded-md border border-gray-700 "
                               placeholder="Password"
                               type="password" name="password" required onChange={handleChange}/>
                        <button
                            className="w-full p-2 bg-gray-50 rounded-md font-bold text-gray-900 border border-gray-700"
                            type="submit">Submit
                        </button>
                        <div>
                            <p className="select-none cursor-pointer font-semibold text-sky-700 float-left px-1"
                               onClick={handleToggle}>{isRegister ? 'Login' : 'Register'}</p>
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

                <div className="p-10"/>
            </section>
        </main>
    </div>)
}

export default Landing;