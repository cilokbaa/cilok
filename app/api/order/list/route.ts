import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  await connectDB();

  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .lean();

  return Response.json({
    success: true,
    total: orders.length,
    orders,
  });
}
