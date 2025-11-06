(function(){
const canvas = document.getElementById('starfield');
const lattice = document.getElementById('lattice');
if(!canvas || !lattice) return;
const ctx = canvas.getContext('2d');
const lctx = lattice.getContext('2d');
let w = canvas.width = lattice.width = window.innerWidth;
let h = canvas.height = lattice.height = window.innerHeight;
let stars = [];
let angle = 0;

function initStars(){ stars = []; for(let i=0;i<220;i++){ stars.push({x:Math.random()*w, y:Math.random()*h, z:Math.random()*w}); } }

function resize(){ w = canvas.width = lattice.width = window.innerWidth; h = canvas.height = lattice.height = window.innerHeight; initStars(); }

function drawStars(){
  ctx.fillStyle = 'rgba(0,0,12,0.45)'; ctx.fillRect(0,0,w,h);
  ctx.fillStyle = '#fff';
  stars.forEach(s=>{ s.z -= 2; if(s.z<=0) s.z = w; let k = 128.0/s.z; let px = s.x*k + w/2; let py = s.y*k + h/2; if(px>=0 && px<=w && py>=0 && py<=h){ let size = (1 - s.z/w)*2; ctx.beginPath(); ctx.arc(px,py,size,0,Math.PI*2); ctx.fill(); } });
}

function drawHexGrid(){
  lctx.clearRect(0,0,w,h);
  lctx.save(); lctx.translate(w/2,h/2); lctx.rotate(angle);
  lctx.strokeStyle = 'rgba(0,230,255,0.12)'; lctx.lineWidth = 1;
  const size = Math.max(40, Math.min(80, Math.floor(Math.min(w,h)/12)));
  for(let y=-h;y<h;y+=size*0.87){
    for(let x=-w;x<w;x+=size*1.5){
      const offset = (Math.floor(y/(size*0.87))%2)* (size*0.75);
      drawHex(x+offset,y,size);
    }
  }
  lctx.restore();
  angle += 0.0006;
}

function drawHex(x,y,s){
  const a = Math.PI*2/6;
  lctx.beginPath();
  for(let i=0;i<6;i++){ lctx.lineTo(x + s*Math.cos(a*i), y + s*Math.sin(a*i)); }
  lctx.closePath(); lctx.stroke();
}

function loop(){ drawStars(); drawHexGrid(); requestAnimationFrame(loop); }

window.addEventListener('resize', resize);
initStars(); loop();
})();