import {IoAddCircleOutline} from "react-icons/io5";
import React, {useState} from "react";
import {MdModeEditOutline} from "react-icons/md";

/* A single item in the shop */
const ShopItem = ({price, name, stock, description, user}) => {

    const [editing, setEditing] = useState(false); // True if we are in editing regime

    // Edit the comment
    const handleItemEdit = async () => {
        setEditing(!editing);
    }

    return (<div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
        <div className="flex flex-row px-2 items-center">
            {editing ? <>
                <div className="text-lg font-semibold pr-5 break-words min-w-min">
                    <textarea className="text-l text-center w-16" placeholder={'Price'} value={price}/>
                </div>
                <div className="flex flex-col justify-start w-full">
                    <textarea className="font-semibold text-lg" placeholder={'Name'} value={name}/>
                    <textarea className="italic text-xs text-gray-500" placeholder={'Stock'} value={stock}/>
                    <textarea className="text-md pt-3" placeholder={'Description'} value={description}/>
                </div>
            </> : <>
                <div className="text-lg font-semibold pr-5 break-words min-w-min">
                    <p className="text-l text-center w-16">£{price}</p>
                </div>
                <div className="flex flex-col justify-start w-full">
                    <p className="font-semibold text-lg">{name}</p>
                    <p className="italic text-xs text-gray-500">Available: {stock}</p>
                    <p className="text-md pt-3">{description}</p>
                </div>
            </>}
            <div className="flex justify-end text-lg font-semibold w-full">
                {user.privilege === 'admin' ? <>
                    {editing ? <button onClick={handleItemEdit}
                                       className="px-2 w-fit hover-text-indigo-600 text-center align-middle rounded-full bg-indigo-600 text-white transition-colors">
                        <MdModeEditOutline/>
                    </button> : <button onClick={handleItemEdit}
                                        className="px-2 w-fit text-indigo-600 text-center align-middle rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                        <MdModeEditOutline/>
                    </button>}
                </> : <></>}

                <button
                    className="text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors py-1 px-1 rounded-full">
                    <IoAddCircleOutline size={25}/>
                </button>
            </div>
        </div>
    </div>)
}

export default ShopItem;