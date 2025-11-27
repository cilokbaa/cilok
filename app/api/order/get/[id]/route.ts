
import { getDB } from "@/lib/db";

export async function GET(req:Request,{params}:any){
  const db=await getDB();
  const trx=params.id;
  const order=await db.collection("orders").findOne({transactionId:trx});
  if(!order) return Response.json({error:"Not found"});
  return Response.json(order);
}
