const palette=document.createElement("div");
palette.style.cssText=`
position:fixed;inset:0;display:none;place-items:center;z-index:9999;
background:rgba(0,0,0,.5)`;
palette.innerHTML=`
<div style="background:#020617;border-radius:16px;padding:16px;width:90%;max-width:420px">
<input id="cmd" placeholder="Type a command…"
style="width:100%;padding:12px;border-radius:12px;border:none;background:#0f172a;color:#fff">
<div style="margin-top:10px;font-size:14px;opacity:.8">
new • refresh • clear
</div>
</div>`;
document.body.appendChild(palette);

window.addEventListener("keydown",e=>{
  if((e.ctrlKey||e.metaKey)&&e.key==="k"){
    e.preventDefault();
    palette.style.display="grid";
    document.getElementById("cmd").focus();
  }
  if(e.key==="Escape") palette.style.display="none";
});

document.getElementById("cmd").addEventListener("keydown",e=>{
  if(e.key!=="Enter") return;
  const v=e.target.value.toLowerCase();
  if(v.includes("new")) newMail();
  if(v.includes("refresh")) refreshInbox();
  if(v.includes("clear")) clearInbox();
  e.target.value="";
  palette.style.display="none";
});