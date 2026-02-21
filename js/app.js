const API="https://api.mail.tm";
let token="", inbox=[], seen=new Set();

async function newMail(){
  inbox=[];seen.clear();render();
  const d=await fetch(API+"/domains").then(r=>r.json());
  const domain=d["hydra:member"][0].domain;
  const email=Math.random().toString(36).slice(2,10)+"@"+domain;
  const pass=Math.random().toString(36);

  await fetch(API+"/accounts",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({address:email,password:pass})});
  const t=await fetch(API+"/token",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({address:email,password:pass})}).then(r=>r.json());

  token=t.token;
  document.getElementById("email").innerText=email;
}

async function refreshInbox(){
  if(!token) return;
  const r=await fetch(API+"/messages",{headers:{Authorization:"Bearer "+token}}).then(r=>r.json());
  r["hydra:member"].forEach(m=>{
    if(seen.has(m.id)) return;
    seen.add(m.id); inbox.unshift(m); pulse();
  });
  render();
}

function render(){
  const list=document.getElementById("inboxList");
  const count=document.getElementById("count");
  list.innerHTML="";
  count.innerText=inbox.length+" messages";

  inbox.forEach(m=>{
    const body=m.intro||m.textPreview||"";
    const otp=body.match(/\b\d{4,8}\b/);
    const html=otp?body.replace(otp[0],`<span class="otp">${otp[0]}</span>`):body;
    const d=document.createElement("div");
    d.className="mail";
    d.innerHTML=`<b>${m.subject||"No subject"}</b><div class="muted">${html}</div>`;
    d.onclick=()=>openSheet(m.subject,html);
    list.appendChild(d);
  });
}

function copyMail(){
  navigator.clipboard.writeText(document.getElementById("email").innerText);
}
function clearInbox(){inbox=[];seen.clear();render()}

newMail();
setInterval(refreshInbox,1000);
