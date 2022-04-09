import mongoose from "mongoose";

// Items in the shop
const shop = mongoose.Schema({
    id: {type: String},
    name: {type: String, required: true},
    description: {type: String},
    stock: {type: Number, required: true, default: 0},
    price: {type: Number, required: true},
});

export default mongoose.model("Shop", shop);