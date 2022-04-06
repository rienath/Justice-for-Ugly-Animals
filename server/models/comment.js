import mongoose from "mongoose";

const comment = mongoose.Schema({
    id: {type: String},
    userID: {type: String, required: true},
    comment: {type: String, required: true},
    from: {type: String, required: true},
    reply: {type: String, default: ''},
    rating: {type: Number, default: 0},
    timeCreated: {type: Date, required: true}
});

export default mongoose.model("Comment", comment);