/* Add the item to basket */
import Shop from "../models/shop.js";
import Basket from "../models/basket.js";
import Purchase from "../models/purchase.js";

/* Helper method that returns user basket by ID. Is used in various calls */
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
    try {
        const data = await getBasketMethod(req.userID);
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Add item to basket. If it is already there, increment the quantity */
export const addBasket = async (req, res) => {
    try {
        const {itemID} = req.body;

        // Check if such item exists
        let item = undefined;
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
            return res.status(400).json('Not enough items in stock');
        } else {
            if (item.stock > 0) { // Only add item if there is stock
                await Basket.create({itemID, userID: req.userID, quantity: 1});
                const newBasket = await getBasketMethod(req.userID);
                return res.status(201).json(newBasket);
            }
            return res.status(400).json('Not enough items in stock');
        }
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Delete the item from the basket (decrease its quantity by 1) */
export const deleteBasket = async (req, res) => {
    try {
        const {itemID} = req.params;

        // If at there was only 1 item in the basket, delete the entry as there is no need to have it there at 0 entries
        const deleted = await Basket.deleteOne({itemID: itemID, userID: req.userID, quantity: 1});

        // If nothing was deleted, there were more items in basket, decrement the quantity then
        if (deleted.deletedCount === 0) {
            await Basket.updateOne({itemID: itemID, userID: req.userID}, {$inc: {quantity: -1}});
        }

        const newBasket = await getBasketMethod(req.userID);
        return res.status(201).json(newBasket)
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}

/* Buy items in basket. This would be connected to Stripe in production application */
export const buy = async (req, res) => {
    try {
        let {itemsInBasket} = req.params;
        itemsInBasket = parseInt(itemsInBasket);
        let itemsInRealBasket = 0;

        // Find items in basket
        const toBuy = await Basket.find({userID: req.userID});

        // Count items in backend basket
        toBuy.filter((obj) => (itemsInRealBasket += obj.quantity));

        // If right after the user has added an item to the basket, someone else has bought it, there will be conflict
        // between frontend and backend. Here we check for that scenario. So if there are more items in frontend,
        // we need to update the basket and shop to reflect recent changes.
        if (itemsInBasket > itemsInRealBasket) { // The stock has changed, so the user cannot buy the items anymore
            // Send updated basket and shop
            const basket = await getBasketMethod(req.userID);
            const shop = await Shop.find();
            return res.status(409).json({
                error: 'While you were thinking, the stock of the items in your basket has changed!',
                basket: basket,
                shop: shop,
            })
        }

        // Get the items that the user is buying and their quantities
        // Also, update the shop stock and baskets, which had this item
        let items = []
        let quantities = []
        for (let i = 0; i < toBuy.length; i++) {
            await Shop.findByIdAndUpdate(toBuy[i].itemID, {$inc: {stock: -toBuy[i].quantity}}, {new: true});
            items.push(toBuy[i].itemID);
            quantities.push(toBuy[i].quantity);
        }

        // If some baskets have more items than current stock, reduce. If after reduction the quantity
        // is 0 or less, remove.
        for (let i = 0; i < toBuy.length; i++) {
            let stock = await Shop.findById(toBuy[i].itemID);
            let a = await Basket.find({
                itemID: toBuy[i].itemID, quantity: {$gt: stock.stock}
            }).updateMany({quantity: stock.stock});
            await Basket.deleteMany({itemID: toBuy[i].itemID, quantity: {$lt: 0}});
        }

        // Add purchases to purchase list
        await Purchase.create({userID: req.userID, items, quantities});

        // Remove everything from the basket of this user
        await Basket.deleteMany({userID: req.userID});

        // Return new updated shop and basket
        const basket = await getBasketMethod(req.userID);
        const shop = await Shop.find();
        return res.status(200).json({basket: basket, shop: shop})
    } catch (err) {
        return res.status(500).json('Server internal error')
    }
}