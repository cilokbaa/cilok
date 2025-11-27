
import { getDB } from "@/lib/db";

export async function GET(){
  const db=await getDB();
  const orders=await db.collection("orders").find().sort({createdAt:-1}).toArray();
  return Response.json({success:true,total:orders.length,orders});
}
