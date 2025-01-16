const mongoose = require('mongoose');
const  {Schema,model} =require("mongoose");

const OrderSchema=new Schema({
    Name:{type:String,required:true},
    Description:{type:String,required:true},
    Price:{type:String,required:true},
})
// export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
 const Order= new model ("Order",OrderSchema)
 module.exports = Order;
