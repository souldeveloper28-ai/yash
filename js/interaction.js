let raf=false;
window.addEventListener("mousemove",e=>{
  if(raf) return;
  raf=true;
  requestAnimationFrame(()=>{
    const x=(e.clientX/window.innerWidth)-0.5;
    const y=(e.clientY/window.innerHeight)-0.5;
    document.documentElement.style.setProperty("--px",x.toFixed(3));
    document.documentElement.style.setProperty("--py",y.toFixed(3));
    raf=false;
  });
});