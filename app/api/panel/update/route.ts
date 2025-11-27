
import { getDB } from "@/lib/db";

export async function POST(req:Request){
  const db=await getDB();
  const {id,user,pass,url}=await req.json();

  const order=await db.collection("orders").findOne({transactionId:id});
  if(!order) return Response.json({error:"Order not found"},{status:404});

  await db.collection("orders").updateOne(
    {transactionId:id},
    {$set:{panel:{username:user,password:pass,url}}}
  );
  return Response.json({success:true});
}
