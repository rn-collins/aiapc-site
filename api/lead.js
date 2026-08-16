const REDIS=process.env.UPSTASH_REDIS_REST_URL;
const TOKEN=process.env.UPSTASH_REDIS_REST_TOKEN;
const RESEND=process.env.RESEND_API_KEY;
const ORIGIN="https://aiapc-site.vercel.app";
function bodyOf(req){try{return typeof req.body==="string"?JSON.parse(req.body):req.body||{}}catch{return null}}
function clean(v,n){return typeof v==="string"?v.trim().slice(0,n):""}
function emailOk(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)&&v.length<=254}
function esc(v){return v.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
async function redis(cmd,...args){if(!REDIS||!TOKEN)throw new Error("storage unavailable");const r=await fetch(`${REDIS}/${cmd}/${args.map(encodeURIComponent).join("/")}`,{headers:{Authorization:`Bearer ${TOKEN}`}});if(!r.ok)throw new Error("storage failed");return r.json()}
export default async function handler(req,res){
 res.setHeader("Access-Control-Allow-Origin",ORIGIN);res.setHeader("Vary","Origin");res.setHeader("Access-Control-Allow-Methods","POST, OPTIONS");res.setHeader("Access-Control-Allow-Headers","Content-Type");res.setHeader("Cache-Control","no-store");
 if(req.method==="OPTIONS")return res.status(204).end();if(req.method!=="POST")return res.status(405).json({error:"Method not allowed"});
 const b=bodyOf(req);if(!b)return res.status(400).json({error:"Invalid JSON"});
 const name=clean(b.name,120),email=clean(b.email,254),message=clean(b.message,3000),inquiryType=clean(b.inquiryType||b.inquiry_type,80),source=clean(b.source,80);
 if(!name||!emailOk(email)||!message)return res.status(400).json({error:"Name, valid email, and message are required"});
 if(b.consent!==true)return res.status(400).json({error:"Consent is required"});
 const allowed=new Set(["early-access","institutional","educator","press","general",""]);if(!allowed.has(inquiryType))return res.status(400).json({error:"Unsupported inquiry type"});
 const id=`AIAPC-${Date.now()}-${crypto.randomUUID().slice(0,8)}`,record={id,name,email,message,inquiryType:inquiryType||"general",source:source||"aiapc-site",consent:true,consentVersion:"2026-08-15",receivedAt:new Date().toISOString(),status:"new"};
 let stored=false,delivered=false;
 try{if(REDIS&&TOKEN){await redis("SET",`aiapc:leads:${id}`,JSON.stringify(record));await redis("LPUSH","aiapc:leads:queue",id);stored=true}
 if(RESEND){const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${RESEND}`},body:JSON.stringify({from:"AIAPC Website <onboarding@resend.dev>",to:["collins.ra@northeastern.edu"],reply_to:email,subject:`AIAPC inquiry: ${record.inquiryType}`,html:`<p><strong>${esc(name)}</strong> (${esc(email)})</p><p>${esc(message).replace(/\n/g,"<br>")}</p><p>Reference: ${id}</p>`})});delivered=r.ok}
 if(!stored&&!delivered)return res.status(503).json({ok:false,error:"Inquiry delivery is temporarily unavailable"});
 return res.status(202).json({ok:true,reference:id,stored,delivered});
 }catch(e){console.error(e);return res.status(503).json({ok:false,error:"Inquiry delivery is temporarily unavailable"})}
}