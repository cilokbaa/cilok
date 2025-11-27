import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req: Request) {
  await connectDB();

  const { plan } = await req.json();

  const prices: any = {
    starter: 5000,
    medium: 10000,
    premium: 20000,
  };

  const amount = prices[plan];
  if (!amount) return Response.json({ error: "Invalid plan" });

  const payment = await fetch(
    "https://ramashop.my.id/api/public/deposit/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY!,
      },
      body: JSON.stringify({ amount }),
    }
  );

  const data = await payment.json();
  const depositId = data?.data?.depositId;
  const transactionId = "TRX" + Date.now();

  await Order.create({
    transactionId,
    plan,
    amount,
    depositId,
    paymentStatus: "pending",
  });

  return Response.json({
    success: true,
    transactionId,
    payment: data,
  });
}
