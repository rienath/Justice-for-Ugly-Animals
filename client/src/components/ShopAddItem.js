import {IoAddCircleOutline} from "react-icons/io5";
import React, {useState} from "react";

/* A component responsible for adding a new item in the shop */
const ShopAddItem = () => {

    const [adding, setAdding] = useState(false); // True if we are in editing regime

    // Edit the comment
    const handleItemAdding = async () => {
        setAdding(!adding);
    }

    return (<>
        {!adding ? <div className="flex justify-center">
            <button onClick={handleItemAdding}
                    className="rounded-full text-white bg-green-500 hover:bg-green-700 font-bold text-xs px-1.5 md:px-4 py-2 outline-none mb-1 transition-colors"
                    type="button"> ADD NEW
            </button>
        </div> : <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
            <div className="flex flex-row px-2 items-center">
                <>
                    <div className="text-lg font-semibold pr-5 break-words min-w-min">
                        <textarea className="text-l text-center w-16" placeholder={'Price'}/>
                    </div>
                    <div className="flex flex-col justify-start w-full">
                        <textarea className="font-semibold text-lg" placeholder={'Name'}/>
                        <textarea className="italic text-xs text-gray-500" placeholder={'Stock'}/>
                        <textarea className="text-md pt-3" placeholder={'Description'}/>
                    </div>
                </>
                <div className="flex justify-end text-lg font-semibold w-full">
                    <button onClick={handleItemAdding}
                            className="text-green-500 border-green-700 hover:bg-green-500 hover:text-white transition-colors py-1 px-1 rounded-full">
                        <IoAddCircleOutline size={25}/>
                    </button>
                </div>
            </div>
        </div>}
    </>)
}

export default ShopAddItem;