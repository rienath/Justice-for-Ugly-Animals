import mongoose from "mongoose";

// Models the likes that users made
const likes = mongoose.Schema({
    id: {type: String},
    userID: {type: String, required: true}, // Who left like
    commentID: {type: String, required: true}, // What comment was liked
});

export default mongoose.model("Likes", likes);