
import { getDB } from "@/lib/db";

export async function POST(req: Request) {
  const db = await getDB();
  const { plan } = await req.json();
  const prices:any={starter:5000,medium:10000,premium:20000};
  const amount=prices[plan];
  if(!amount) return Response.json({error:"Invalid plan"});

  const payment = await fetch("https://ramashop.my.id/api/public/deposit/create",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "X-API-Key":process.env.API_KEY!
    },
    body:JSON.stringify({amount})
  });
  const data=await payment.json();
  const depositId=data?.data?.depositId;
  const transactionId="TRX"+Date.now();

  await db.collection("orders").insertOne({
    transactionId,plan,amount,depositId,paymentStatus:"pending",createdAt:new Date()
  });

  return Response.json({success:true,transactionId,payment:data});
}
