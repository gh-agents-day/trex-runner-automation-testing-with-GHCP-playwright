const c=document.getElementById('game');
const ctx=c.getContext('2d');
const highScoreEl=document.getElementById('highscore');
let y=150,vy=0,g=1,score=0;
let obs=800;

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
 ctx.fillRect(50,y,20,20);
 ctx.fillRect(obs,160,20,40);
 ctx.fillText('Score:'+score,10,20);
 if(obs<70&&obs>50&&y>140)gameOver();
 else requestAnimationFrame(loop);
}
loop();
