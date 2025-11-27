
import { getDB } from "@/lib/db";

export async function GET(req:Request,{params}:any){
  const db=await getDB();
  const trx=params.id;

  const order=await db.collection("orders").findOne({transactionId:trx});
  if(!order) return Response.json({error:"Order not found"});

  const res=await fetch("https://ramashop.my.id/api/public/deposit/status/"+order.depositId);
  const data=await res.json();

  if(data?.data?.status==="success"){
    await db.collection("orders").updateOne(
      {transactionId:trx},
      {$set:{paymentStatus:"paid"}}
    );
  }

  const updated = data?.data?.status==="success"?"paid":order.paymentStatus;
  return Response.json({status:updated,raw:data});
}
