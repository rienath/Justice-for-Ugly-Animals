import {IoAddCircleOutline} from "react-icons/io5";
import React, {useState} from "react";
import {MdModeEditOutline} from "react-icons/md";
import {editItem} from "../api";

/* A single item in the shop */
const ShopItem = ({initialItem, user}) => {

    const [editing, setEditing] = useState(false); // True if we are in editing regime
    const [item, setItem] = useState(initialItem);

    // Edit the comment
    const handleItemEdit = async () => {
        if (editing) { // If the item was edited, send it to server
            await editItem(item);
        }
        setEditing(!editing);
    }

    // Change handlers
    const handleNameChange = (e) => {
        setItem({...item, name: e.target.value});
    }

    const handleDescriptionChange = (e) => {
        setItem({...item, description: e.target.value});
    }

    const handleStockChange = (e) => {
        setItem({...item, stock: e.target.value});
    }

    const handlePriceChange = (e) => {
        setItem({...item, price: e.target.value});
    }

    return (<div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
        <div className="flex flex-row px-2 items-center">
            {editing ? <>
                <div className="text-lg font-semibold pr-5 break-words min-w-min">
                    <textarea className="text-l text-center w-16" placeholder={'Price'} value={item.price}
                              onChange={handlePriceChange}/>
                </div>
                <div className="flex flex-col justify-start w-full">
                    <textarea className="font-semibold text-lg pl-2" placeholder={'Name'} value={item.name}
                              onChange={handleNameChange}/>
                    <textarea className="italic text-xs text-gray-500 pl-2" placeholder={'Stock'} value={item.stock}
                              onChange={handleStockChange}/>
                    <textarea className="text-md pl-2" placeholder={'Description'} value={item.description}
                              onChange={handleDescriptionChange}/>
                </div>
            </> : <>
                <div className="text-lg font-semibold pr-5 break-words min-w-min">
                    <p className="text-l text-center w-16">£{item.price}</p>
                </div>
                <div className="flex flex-col justify-start w-full">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="italic text-xs text-gray-500">Available: {item.stock}</p>
                    <p className="text-md pt-3">{item.description}</p>
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