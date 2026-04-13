const c=document.getElementById('game');
const ctx=c.getContext('2d');
const highScoreEl=document.getElementById('highscore');
let y=150,vy=0,g=1,score=0;
let obs=800;

// Dino SVG asset (pixel-art T-Rex style)
const dinoImg=new Image();
dinoImg.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect x="0" y="24" width="6" height="4" fill="#535353"/>
  <rect x="4" y="20" width="6" height="8" fill="#535353"/>
  <rect x="8" y="18" width="20" height="16" fill="#535353"/>
  <rect x="16" y="14" width="14" height="8" fill="#535353"/>
  <rect x="22" y="8" width="10" height="10" fill="#535353"/>
  <rect x="20" y="4" width="18" height="12" fill="#535353"/>
  <rect x="32" y="6" width="4" height="4" fill="white"/>
  <rect x="33" y="7" width="2" height="2" fill="#111"/>
  <rect x="34" y="12" width="8" height="4" fill="#535353"/>
  <rect x="24" y="24" width="8" height="3" fill="#535353"/>
  <rect x="30" y="24" width="4" height="5" fill="#535353"/>
  <rect x="22" y="34" width="7" height="10" fill="#535353"/>
  <rect x="20" y="42" width="9" height="4" fill="#535353"/>
  <rect x="10" y="34" width="7" height="8" fill="#535353"/>
  <rect x="8" y="40" width="11" height="4" fill="#535353"/>
</svg>`);

// Cactus SVG asset
const cactusImg=new Image();
cactusImg.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 55">
  <rect x="11" y="0" width="8" height="55" fill="#2f9e44"/>
  <rect x="2" y="14" width="11" height="7" fill="#2f9e44"/>
  <rect x="2" y="6" width="7" height="15" fill="#2f9e44"/>
  <rect x="18" y="22" width="10" height="7" fill="#2f9e44"/>
  <rect x="21" y="14" width="7" height="15" fill="#2f9e44"/>
  <rect x="10" y="2" width="2" height="5" fill="#40c057"/>
  <rect x="18" y="2" width="2" height="5" fill="#40c057"/>
  <rect x="0" y="9" width="4" height="2" fill="#40c057"/>
  <rect x="26" y="17" width="4" height="2" fill="#40c057"/>
</svg>`);

// Fetch high score from API on load
fetch('http://localhost:3000/score')
  .then(r=>r.json())
  .then(data=>{ if(highScoreEl) highScoreEl.textContent='High Score: '+data.highScore; })
  .catch(()=>{});

document.addEventListener('keydown',()=>{if(y>=150)vy=-15});

function gameOver(){
  fetch('http://localhost:3000/score/'+score,{method:'POST'})
    .finally(()=>location.reload());
}

function loop(){
 ctx.clearRect(0,0,800,200);
 vy+=g;y+=vy;if(y>150){y=150;vy=0}
 obs-=6;if(obs<0){obs=800;score++}
 window.gameScore = score;
 // Ground line
 ctx.fillStyle='#bbb';
 ctx.fillRect(0,193,800,3);
 // Dino: 44x44 pixel-art T-Rex, bottom aligned to ground
 ctx.drawImage(dinoImg,40,y-18,44,44);
 // Cactus: 30x55 green cactus, bottom aligned to ground
 ctx.drawImage(cactusImg,obs,138,30,55);
 ctx.fillStyle='#555';
 ctx.font='14px sans-serif';
 ctx.fillText('Score: '+score,10,18);
 if(obs<70&&obs>50&&y>140)gameOver();
 else requestAnimationFrame(loop);
}
loop();
