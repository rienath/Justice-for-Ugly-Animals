import React, {useState} from 'react';
import './index.css';

const App = () => {
    const handleSubmit = () => {
        console.log("Hi!");
    };

    const [toggleRegister, setToggleRegister] = useState(false);

    const handleToggle = () => {
        setToggleRegister((prev) => !prev);
    };

    return (
        <div className="pattern-isometric pattern-indigo-50 pattern-bg-transparent pattern-opacity-80">
            <main className="flex md:h-screen">
                <section className="container m-auto space-y-16 pb-12 md:pb-0">
                    <div className="max-w-3xl mx-auto text-center md:text-left md:flex md:space-x-3 space-y-14 pt-12 md:space-y-4 md:pt-0">
                        <h1 className="text-6xl font-extrabold leading-none space-y-16">
                            Love for the Uglies
                        </h1>

                        <form className="space-y-4 md:space-y-4 px-12 px-24 md:pb-0 pb-1" onSubmit={handleSubmit}>
                            <input
                                className="w-full p-2 bg-pink-50 rounded-md border border-gray-700 focus:border-blue-700"
                                placeholder="E-Mail" required type="email" id=""/>
                            {!toggleRegister &&
                                <input
                                    className="w-full p-2 bg-pink-50 rounded-md border border-gray-700 focus:border-blue-700"
                                    placeholder="Login" required type="text" id=""/>
                            }
                            <input className="w-full p-2 bg-pink-50 rounded-md border border-gray-700 "
                                placeholder="Password"
                                type="password" id="" required/>
                            <button
                                className="w-full p-2 bg-gray-50 rounded-md font-bold text-gray-900 border border-gray-700" type="submit">Submit</button>
                            <div>
                                <p className="select-none cursor-pointer font-semibold text-sky-700 float-left px-1" onClick={handleToggle}>{toggleRegister ? 'Register' : 'Login'}</p>
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

export default App;
