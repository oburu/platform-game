//global variables
const INITIAL_POSITION = 200;
const INITIAL_VELOCITY = 0;
let player = {
  x:INITIAL_POSITION,
  y:INITIAL_POSITION,
  width:10,
  height:20
}
let velocity = {
  x:INITIAL_VELOCITY,
  y:INITIAL_VELOCITY
}
let gravity = 0.5;
let onGround = false;
let holdLeft = false, holdRight = false;
let platform = [], canv, ctx;

window.onload = () => {
  canv = document.getElementById('game');
  let controls = document.getElementById('controls');
  ctx = canv.getContext('2d');

  setInterval(update,1000/30);

  document.addEventListener('keydown', keyDown);
  document.addEventListener('keyup', keyUp);

  controls.addEventListener('touchstart', mouseDown);
  controls.addEventListener('touchend', mouseUp);

  //fill the platform array
  createPlatforms();
}

const createPlatforms = () =>{
  //clear the platforms yo!
  platform = [];
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
    velocity.x =- 2;
  }
  if(holdRight) {
    velocity.x = 2;
  }

  player.x += velocity.x;
  player.y += velocity.y;

  if(onGround) {
    velocity.x *= 0.8;
  } else {
    velocity.y += gravity;
  }

  if(player.x >= canv.width){
    player.x = 0;
    createPlatforms();
  }
  if(player.x <= 0){
    player.x = 0;
  }

  if(player.y >= canv.height){
    player.y = INITIAL_POSITION;
    player.x = INITIAL_POSITION;
    velocity.x = INITIAL_VELOCITY;
    velocity.y = INITIAL_VELOCITY;
  }

  //assume we are not on the ground for the next frame
  onGround=false;
  platform.forEach((item) => {
    if(player.x > item.x && player.x < item.x+item.w && player.y > item.y && player.y < item.y+item.h) {
      player.y = item.y;
      onGround = true;
    }
  });
  //draw background
  ctx.fillStyle='black';
  ctx.fillRect(0,0,canv.width,canv.height);

  //draw player
  ctx.fillStyle='white';
  ctx.fillRect(player.x - player.width/2, player.y - player.height, player.width, player.height);

  //draw platforms
  drawPlatforms();
}

const drawPlatforms = () => {
  platform.forEach((item) => {
    ctx.fillStyle='green';
    ctx.fillRect(item.x,item.y,item.w,item.h);
  });
}

const keyDown = (e)=> {
  switch(e.keyCode) {
    case 37:
      holdLeft = true;
      break;
    case 38:
      if(onGround) {
        velocity.y =- 10;
      }
      break;
    case 39:
      holdRight = true;
      break;
  }
}
const keyUp = (e)=> {
  switch(e.keyCode) {
    case 37:
      holdLeft = false;
      break;
    case 38:
      if(velocity.y < -3) {
        velocity.y =- 3;
      }
      break;
    case 39:
      holdRight = false;
      break;
  }
}
const mouseDown = (e) =>{
  switch(e.target.id) {
    case 'left':
      holdLeft = true;
      break;
    case 'up':
      if(onGround) {
        velocity.y =- 10;
      }
      break;
    case 'right':
      holdRight = true;
      break;
  }
}
const mouseUp = (e)=> {
  switch(e.target.id) {
    case 'left':
      holdLeft = false;
      break;
    case 'up':
      if(velocity.y < -3) {
        velocity.y =- 3;
      }
      break;
    case 'right':
      holdRight = false;
      break;
  }
}
