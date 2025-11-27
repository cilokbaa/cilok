import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    transactionId: String,
    plan: String,
    amount: Number,
    depositId: String,
    paymentStatus: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
