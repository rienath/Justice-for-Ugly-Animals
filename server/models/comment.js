import mongoose from "mongoose";

const comment = mongoose.Schema({
    id: {type: String},
    userID: {type: String, required: true},
    comment: {type: String, required: true},
    from: {type: String, required: true}, // ID of the user who wrote the comment
    replyID: {type: String, default: ''}, // ID of the head comment if this is a reply
    replies: {type: Array}, // Always empty but used when returning comments that have replies
    rating: {type: Number, default: 0}, // TODO delete
    timeCreated: {type: Date, required: true}
});

export default mongoose.model("Comment", comment);