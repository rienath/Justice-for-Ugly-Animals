import mongoose from "mongoose";

// Items in the shop
const basket = mongoose.Schema({
    id: {type: String},
    itemID: {type: String, required: true}, // The ID of the item
    userID: {type: String, required: true}, // The ID of the user, who has the item in basket
    quantity: {type: Number, required: true},
});

export default mongoose.model("Basket", basket);