function openSheet(sub,body){
  document.getElementById("sheetSubject").innerText=sub||"Message";
  document.getElementById("sheetBody").innerHTML=body||"";
  document.getElementById("sheet").classList.remove("hidden");
}
function closeSheet(){
  document.getElementById("sheet").classList.add("hidden");
}
function pulse(){
  document.body.animate(
    [{filter:"brightness(1.15)"},{filter:"brightness(1)"}],
    {duration:200}
  );
}