import React, {useEffect, useState} from 'react';
import ShopItem from "./ShopItem";
import ShopBasketItem from "./ShopBasketItem";
import ShopAddItem from "./ShopAddItem";
import {buy, deleteComment, getAllItems, getBasket} from "../api";

const Shop = ({user}) => {

    const [allItems, setAllItems] = useState([]); // All shop items
    const [basket, setBasket] = useState([]); // All basket items
    const [basketPrice, setBasketPrice] = useState(0); // Price of the basket

    // Get all shop items from server and set them
    useEffect(() => {
        getAllItems().then((res) => setAllItems(res.data))
            .then((err) => console.log(err));
    }, []);

    // Get all basket items of user from server and set them
    useEffect(() => {
        getBasket().then((res) => setBasket(res.data))
            .then((err) => console.log(err));
    }, []);

    // Set the total price of the basket every time basket updates
    useEffect(() => {
        setBasketPrice(0);
        let price = 0;
        basket.filter((obj) => price += obj.price * obj.quantity);
        setBasketPrice(price);
    }, [basket]);

    const handlePay = async () => {
        try {
            const response = await buy();
            setBasket(response.data.basket);
            setAllItems(response.data.shop);
        } catch (err) {
            // TODO: get error messages
            console.log(err);
        }
    }

    return (<div>
        <div
            className="h-full min-h-screen pattern-isometric pattern-indigo-50 pattern-bg-transparent pattern-opacity-80">
            <div className="flex flex-col items-center py-10 px-5">
                <div className="bg-white py-4 px-4 shadow-xl rounded-lg max-w-3xl">
                    <div className="text-lg text-center font-light">
                        <p>If you are part of this community, you obviously know about our SUPERSECRET UglyCon,
                            which takes place every 23rd weekend of the year in a lovely venue in Edinburgh (EH78 5HU).
                            And you obviously know that we use a unique currency to buy merch or pay for services
                            at our events: <b>uglyCOINS</b>. Their number is limited, and you can only buy them online.
                            You will
                            receive your <b>uCOINS</b> when you enter the event.</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8">
                    <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        <div className="px-4 items-center">
                            <p className="text-center font-semibold text-3xl">SHOP</p>
                        </div>
                    </div>
                    {user.privilege === 'admin' ? <ShopAddItem allItems={allItems} setAllItems={setAllItems}/> : <></>}

                    {allItems.slice(0).reverse().map((item) => (
                        <ShopItem key={item._id} initialItem={item} user={user} basket={basket}
                                  setBasket={setBasket}/>))}

                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-4 xxl:col-span-4">
                    <div className="bg-white py-4 px-4 shadow-xl rounded-lg my-4 mx-4">
                        <div className="flex pb-5 justify-center items-center text-center">
                            <div className="text-xl font-semibold">
                                <p className="text-3xl">BASKET</p>
                            </div>
                        </div>

                        {basket.slice(0).reverse().map((basketItem) => (
                            <ShopBasketItem key={basketItem._id} item={basketItem} setBasket={setBasket}/>))}

                        <div className="flex justify-center items-center text-center">
                            <div className="text-xl font-semibold">
                                <p>Total Price</p>
                                <p className="text-5xl">£{basketPrice}</p>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-center pb-10">
                        {basket.length > 0 ? <button onClick={handlePay}
                                                     className="text-white bg-green-500 hover:bg-green-700 font-bold text-xs px-1.5 md:px-4 py-2 rounded outline-none mb-1 transition-colors"
                                                     type="button"> PAY
                        </button> : <></>}
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Shop;