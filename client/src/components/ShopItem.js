import {IoAddCircleOutline} from "react-icons/io5";
import React, {useEffect, useState} from "react";
import {MdModeEditOutline} from "react-icons/md";
import {addBasket, editItem, getBasket} from "../api";
import toast, {Toaster} from "react-hot-toast";

/* A single item in the shop */
const ShopItem = ({initialItem, user, basket, setBasket}) => {

    const [editing, setEditing] = useState(false); // True if we are in editing regime
    const [item, setItem] = useState(initialItem);


    // Update availability on pay
    useEffect(() => {
        setItem(initialItem);
    }, [initialItem]);


    // Edit the comment
    const handleItemEdit = async () => {
        if (editing) { // If the item was edited, send it to server
            editItem(item).then(() => {
                // Also refresh the basket as if the stock was reduced or price was changed, this has to be displayed
                getBasket().then((res) => {
                    setBasket(res.data);
                    setEditing(!editing);
                }).catch((err) => toast.error(err.response.data));
            }).catch((err) => toast.error(err.response.data));
        } else {
            setEditing(!editing);
        }
    }

    // Handle add to basket button
    const handleAddBasket = async (e) => {
        addBasket({itemID: item._id}).then((newBasket) => setBasket(newBasket.data)).catch((err) => toast.error(err.response.data));
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

    // Do not make new line on enter
    const handleEnter = (e) => {
        if (e.key === 'Enter') e.preventDefault()
    }

    return (<><Toaster/>
        <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
            <div className="flex flex-row px-2 items-center">
                {editing ? <>
                    <div className="text-lg font-semibold pr-5 break-words min-w-min">
                    <textarea className="text-l text-center w-16" placeholder={'Price'} value={item.price}
                              onChange={handlePriceChange} onKeyPress={handleEnter}/>
                    </div>
                    <div className="flex flex-col justify-start w-full">
                    <textarea className="font-semibold text-lg pl-2" placeholder={'Name'} value={item.name}
                              onChange={handleNameChange} onKeyPress={handleEnter}/>
                        <textarea className="italic text-xs text-gray-500 pl-2" placeholder={'Stock'} value={item.stock}
                                  onChange={handleStockChange} onKeyPress={handleEnter}/>
                        <textarea className="text-md pl-2" placeholder={'Description'} value={item.description}
                                  onChange={handleDescriptionChange} onKeyPress={handleEnter}/>
                    </div>
                </> : <>
                    <div className="text-lg font-semibold pr-5 break-words min-w-min">
                        <p className="text-l text-center w-16">??{item.price}</p>
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
                                           className="p-2 w-fit hover-text-indigo-600 text-center align-middle rounded-full bg-indigo-600 text-white transition-colors">
                            <MdModeEditOutline/>
                        </button> : <button onClick={handleItemEdit}
                                            className="p-2 w-fit text-indigo-600 text-center align-middle rounded-full hover:bg-indigo-600 hover:text-white transition-colors">
                            <MdModeEditOutline/>
                        </button>}
                    </> : <></>}
                    {item.stock > 0 ? <button
                        className="text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors px-1 py-1 rounded-full"
                        onClick={handleAddBasket}>
                        <IoAddCircleOutline size={25}/>
                    </button> : <></>}
                </div>
            </div>
        </div>
    </>)
}

export default ShopItem;