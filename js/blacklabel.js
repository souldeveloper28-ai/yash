const Mode={IDLE:"idle",SIGNAL:"signal",FOCUS:"focus"};
function setMode(m){document.body.setAttribute("data-mode",m)}
setMode(Mode.IDLE);

const _pulse=window.pulse;
window.pulse=()=>{
  if(_pulse) _pulse();
  setMode(Mode.SIGNAL);
  setTimeout(()=>setMode(Mode.IDLE),1200);
};

const _open=window.openSheet;
window.openSheet=(s,b)=>{
  setMode(Mode.FOCUS);
  _open(s,b);
};

const _close=window.closeSheet;
window.closeSheet=()=>{
  setMode(Mode.IDLE);
  _close();
};