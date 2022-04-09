import Shop from "../models/shop.js";

/* Add new item to the shop */
export const addItem = async (req, res) => {
    try {
        const {name, description, stock, price} = req.body;
        try {
            const newItem = await Shop.create({name, description, stock, price});
            return res.status(201).json(newItem);
        } catch (err) { // Error can occur if price and stock are not numbers.
            return res.status(400).json('Price and stock should be numeric')
        }
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Get all items from the shop */
export const getAllItems = async (req, res) => {
    try {
        const allItems = await Shop.find({});
        return res.status(200).json(allItems);
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Replace item in the shop with new one (edit) */
export const editItem = async (req, res) => {
    try {
        const item = req.body;
        try {
            const modifiedItem = await Shop.findByIdAndUpdate(item._id, {
                name: item.name, description: item.description, stock: item.stock, price: item.price
            });
            return res.status(200).json(modifiedItem);
        } catch (err) { // Error can occur if price and stock are not numbers.
            return res.status(400).json('Price and stock should be numeric')
        }
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}