import {IoAddCircleOutline} from "react-icons/io5";
import React from "react";
import {BiMinus, BiPlus} from "react-icons/bi";

/* A single item in the basket */
const ShopBasketItem = ({item, user}) => {

    return (<div className="flex flex-row items-center border-b-2 mb-2">
        <div className="text-lg font-semibold pr-5 break-words min-w-min">
            <p className="text-l text-center w-16">£{item.price}</p>
        </div>
        <div className="text-lg py-2 w-full justify-start">
            <p>{item.name}</p>
        </div>
        <div className="flex justify-self-end w-full text-lg py-2">
            <div className="flex flex-row space-x-2 w-full items-center justify-end rounded-lg">
                <button
                    className="text-indigo-600 border border-solid border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors py-1 px-1 rounded-full">
                    <BiMinus/>
                </button>
                <p> {item.quantity} </p>
                <button
                    className="text-indigo-600 border border-solid border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors py-1 px-1 rounded-full">
                    <BiPlus/>
                </button>
            </div>
        </div>
    </div>)
}

export default ShopBasketItem;