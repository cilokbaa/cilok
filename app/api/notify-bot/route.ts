
export async function POST(req:Request){
  const body=await req.json();
  await fetch(process.env.BOT_URL+"/notify",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(body)
  });
  return Response.json({success:true});
}
