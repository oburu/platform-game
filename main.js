//global variables
let playeX=200, playerY=200;
let xVelocity=0, yVelocity=0;
let gravity=0.5;
let onGround=false;
let holdLeft=false, holdRight=false, platform=[], canv, ctx;

window.onload=() => {
  canv=document.getElementById("gc");
  ctx=canv.getContext("2d");

  setInterval(update,1000/30);

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  //fill the platform array
  for(i=0;i<50;i++) {
    platform.push({
      x:Math.random()*canv.width,
      y:Math.random()*canv.height,
      w:Math.random()*100+30,
      h:Math.random()*30+20
    });
  }
}

const update = () => {
  if(holdLeft) {
    xVelocity=-2;
  }

  if(holdRight) {
    xVelocity=2;
  }

  playeX+=xVelocity;
  playerY+=yVelocity;

  if(onGround) {
    xVelocity *= 0.8;
  } else {
    yVelocity += gravity;
  }

  //assume we are not on the ground for the next frame
  onGround=false;
  platform.forEach((item)=>{
    if(playeX>item.x && playeX<item.x+item.w &&
      playerY>item.y && playerY<item.y+item.h) {
      playerY=item.y;
      onGround=true;
    }
  });

  ctx.fillStyle="black";
  ctx.fillRect(0,0,canv.width,canv.height);

  ctx.fillStyle="white";
  ctx.fillRect(playeX-5,playerY-20,10,20);

  platform.forEach((item)=>{
    ctx.fillStyle="green";
    ctx.fillRect(item.x,item.y,item.w,item.h);
  });
}

const keyDown = (e)=> {
  switch(e.keyCode) {
    case 37:
      holdLeft=true;
      break;
    case 38:
      if(onGround) {
        yVelocity=-10;
      }
      break;
    case 39:
      holdRight=true;
      break;
  }
}

const keyUp = (e)=> {
  switch(e.keyCode) {
    case 37:
      holdLeft=false;
      break;
    case 38:
      if(yVelocity<-3) {
        yVelocity=-3;
      }
      break;
    case 39:
      holdRight=false;
      break;
  }
}
