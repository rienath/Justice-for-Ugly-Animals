import mongoose from "mongoose";

// Items in the shop
const purchase = mongoose.Schema({
    id: {type: String},
    userID: {type: String, required: true}, // The ID of the user, who bought it
    items: {type: Array, required: true}, // The ID of the item
    quantities: {type: Array, required: true}, // Quantity (in the same ordder as items)
});

export default mongoose.model("Purchase", purchase);