const mongoose = require("mongoose"); // Import mongoose
const { Schema, model } = mongoose;  // Destructure Schema and model

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: { type: String },
    phone: { type: String},
    address: { type: String },
     orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderNow" }] ,// Reference to Order model
  


})
const User = new model("User", UserSchema)
module.exports = User
