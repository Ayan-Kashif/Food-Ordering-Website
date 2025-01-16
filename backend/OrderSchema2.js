const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");
const { BsTextarea } = require('react-icons/bs');

const OrderSchema2 = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  // To take the userId from User collection
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, default: 1 },  // Default value for quantity
      price: { type: String, required: true }, 
      desc: { type: String },
      size: { 
        type: String, 
        enum: ["small", "medium", "large"], // Restrict to these values
        required: function() {
          return this.name.toLowerCase().includes("pizza"); // Make size required for pizzas
        }
      }
    }
  ],
  totalPrice: { type: String,required:true },
  name: { type: String, required: true },
  address: { type: String, required: true },
 
  phone: { type: String, required: true },
  email: { type: String, required: true },
  channel: { type: String, required: true },
  status: { type: String, default: 'Pending' }, // Default status is "Pending"
  
  instructions:{type:String},
  alternatePhone:{type:String},
  createdAt: { 
    type: Date, 
    default: Date.now 
  },  // Use Date object for createdAt
});

const OrderNow = model("OrderNow", OrderSchema2);

module.exports = OrderNow;
