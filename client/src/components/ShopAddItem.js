import {IoAddCircleOutline} from "react-icons/io5";
import React, {useState} from "react";
import {addShopItem} from "../api";
import toast, {Toaster} from "react-hot-toast";

/* A component responsible for adding a new item in the shop */
const ShopAddItem = ({allItems, setAllItems}) => {

    const [adding, setAdding] = useState(false); // True if we are in editing regime
    const [item, setItem] = useState({name: '', description: '', stock: undefined, price: undefined});


    // Edit the comment
    const handleItemAdding = async () => {
        if (adding) { // If the admin was already adding, we need to send the new item to server
            addShopItem(item).then((newItem) => {
                const temp = allItems.slice();
                temp.push(newItem.data);
                setAllItems(temp);
                setItem({name: '', description: '', stock: undefined, price: undefined}); // Reset value of item
                setAdding(!adding);
            }).catch((err) => toast.error(err.response.data));
        } else {
            setAdding(!adding);
        }
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
        {!adding ? <div className="flex justify-center">
            <button onClick={handleItemAdding}
                    className="rounded-full text-white bg-green-500 hover:bg-green-700 font-bold text-xs px-1.5 md:px-4 py-2 outline-none mb-1 transition-colors"
                    type="button"> ADD NEW
            </button>
        </div> : <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
            <div className="flex flex-row px-2 items-center">
                <>
                    <div className="text-lg font-semibold pr-5 break-words min-w-min">
                        <textarea className="text-l text-center w-16" placeholder={'Price'} value={item.price}
                                  onChange={handlePriceChange} onKeyPress={handleEnter}/>
                    </div>
                    <div className="flex flex-col justify-start w-full">
                        <textarea className="font-semibold text-lg pl-1" placeholder={'Name'} value={item.name}
                                  onChange={handleNameChange} onKeyPress={handleEnter}/>
                        <textarea className="italic text-xs text-gray-500 pl-1" placeholder={'Stock'} value={item.stock}
                                  onChange={handleStockChange} onKeyPress={handleEnter}/>
                        <textarea className="text-md pl-1" placeholder={'Description'} value={item.description}
                                  onChange={handleDescriptionChange} onKeyPress={handleEnter}/>
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