import mongoose from "mongoose";

// Comments
const comment = mongoose.Schema({
    id: {type: String},
    userID: {type: String, required: true},
    comment: {type: String, required: true},
    from: {type: String, required: true}, // Username of the user who wrote the comment
    replyID: {type: String, default: ''}, // ID of the head comment if this is a reply
    replies: {type: Array}, // Always empty but used when returning comments that have replies
    timeCreated: {type: Date, required: true}
});

export default mongoose.model("Comment", comment);