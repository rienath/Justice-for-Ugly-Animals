/* Add the item to basket */
import Shop from "../models/shop.js";
import Basket from "../models/basket.js";

/* Returns user basket by ID. Is used in various calls */
export const getBasketMethod = async (userID) => {
    let basket = await Basket.find({userID});
    let data = JSON.parse(JSON.stringify(basket)); // Need to make a copy as cannot modify mongoose object
    for (let i = 0; i < data.length; i++) {
        const item = await Shop.findById(data[i].itemID)
        data[i].name = item.name; // Add price and name attributes as they are needed in the app
        data[i].price = item.price;
    }
    return data;
}

/* Get the basket items */
export const getBasket = async (req, res) => {
    const data = await getBasketMethod(req.userID);
    return res.status(200).json(data);
}

/* Add item to basket. If it is already there, increment the quantity */
export const addBasket = async (req, res) => {
    try {
        const {itemID} = req.body;
        let item = undefined;
        // Check if such item exists
        try {
            item = await Shop.findById(itemID);
        } catch (err) { // No such item error
            return res.status(404).json('Such item does not exist');
        }
        if (item.stock === 0) { // If someone already bought the item
            return res.status(400).json('The item is no longer in stock');
        }
        // Add the item to basket
        // If user already has this item in basket, increase it's number
        const foundInBasket = await Basket.findOne({itemID: itemID, userID: req.userID});
        if (foundInBasket) { // If the item is already in basket, just increase it's
            const basketItem = await Basket.findById(foundInBasket._id, {quantity: foundInBasket.quantity + 1});
            if (basketItem.quantity < item.stock) { // Only add if there is enough item in stock
                await basketItem.updateOne({quantity: basketItem.quantity + 1}); // Increment the quantity
                const newBasket = await getBasketMethod(req.userID);
                return res.status(201).json(newBasket);
            }
            return res.status(400).json('Not enough item in stock');
        } else {
            if (item.stock > 0) { // Only add item if there is stock
                await Basket.create({itemID, userID: req.userID, quantity: 1});
                const newBasket = await getBasketMethod(req.userID);
                return res.status(201).json(newBasket);
            }
            return res.status(400).json('Not enough item in stock');
        }
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Delete the item from the basket (decrease its quantity by 1) */
export const deleteBasket = async (req, res) => {
    try {
        const {itemID} = req.body;
        // If at 1, delete the entry
        const deleted = Basket.remove({itemID, userID: req.userID, quantity: 1}, function (err) {
            if (!err) {
                console.log(1);
            } else {
                console.log(2);
            }
        });
        // If it was not deleted (more than 1), decrease the quantity

    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}