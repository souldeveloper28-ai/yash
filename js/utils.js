function timeAgo(ts){
  const s=Math.floor((Date.now()-ts)/1000);
  if(s<60) return "Just now";
  if(s<3600) return Math.floor(s/60)+"m ago";
  return Math.floor(s/3600)+"h ago";
}