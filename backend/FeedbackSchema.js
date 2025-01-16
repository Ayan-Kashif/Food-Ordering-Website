const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "OrderNow", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  rating: { type: Number, required: true },
  channel: { type: String, required: true },
  visitDate: { type: Date, required: true },
  feedback: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = model("Feedback",FeedbackSchema);

module.exports = Feedback;