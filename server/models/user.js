import mongoose from "mongoose";

// Users
const userSchema = mongoose.Schema({
    id: {type: String},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    privilege: {type: String, required: true, default: 'user'},
});

export default mongoose.model("User", userSchema);