var ballX=50;
var ballY=50;
var canvas;
var canvasContext;
const PADDLE_HEIGHT=100;
const PADDLE_WIDTH=15;
var speedX=20;
var speedY=5;
var framePerSecond=30;
var paddle1y=150;
var paddle2y=150;
var player1Score=0;
var player2Score=0;
const WINNING_SCORE=3;
var showWinSCore=false;
var count=false;
canvas=document.getElementById("gameCanvas");
canvasContext=canvas.getContext("2d");
window.onload=function(){
    
    setInterval(function(){
        drawEverything();
       // moveEverything();
    },1000/framePerSecond);
        
       // document.addEventListener("keydown",player2Controls);
        canvas.addEventListener('mousemove',function(e){
            var mousePos=calculateMousePos(e);
            paddle1y=mousePos.y - PADDLE_HEIGHT/2;
        });
        canvas.addEventListener('mousedown',restart);
  
}
function computer(){
    setInterval(function(){
       moveEverything();
       computerMovement();
    },1000/framePerSecond);
    var cpu=true;
    console.log(cpu);
}
function multiPlayer(){
    setInterval(moveEverything,1000/framePerSecond);
   document.addEventListener("keydown",player2Controls);
}
function calculateMousePos(e){
    var rect=canvas.getBoundingClientRect();
    var root=document.documentElement;
    var mouseX=e.clientX - rect.left - root.scrollLeft;
    var mouseY=e.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };

}
function player2Controls(evt){
    switch(evt.keyCode){
        case 38:{
                paddle2y-=20;
                break;
        }
     
        case 40:{
            paddle2y+=20;
            break;
        }
    }
}
function drawEverything(){
    colorRect(0,0,canvas.width,canvas.height,"black");
    if(showWinSCore){
        if(player1Score == WINNING_SCORE){
            canvasContext.fillStyle="white";
            canvasContext.font="25px Arial";
            canvasContext.fillText("PLAYER-1 Won !!!",canvas.width/2-100,100);   
        }
                    
       if(player2Score == WINNING_SCORE){
        canvasContext.fillStyle="white";
        canvasContext.font="25px Arial";
        canvasContext.fillText("PLAYER-2 Won !!!",canvas.width/2-100,100);   
       }
        canvasContext.fillStyle="white";
        canvasContext.fillText("CLICK TO RESTART",canvas.width/2-100,400);
        return;
    }
    colorRect(0,paddle1y,PADDLE_WIDTH,PADDLE_HEIGHT,"white");
    colorRect(canvas.width-PADDLE_WIDTH,paddle2y,PADDLE_WIDTH,PADDLE_HEIGHT,"white");
    drawNet();
    colorCircle(ballX,ballY,15,"white");
    canvasContext.font="15px Arial";
    canvasContext.fillText(player1Score,100,100);
    canvasContext.fillText(player2Score,canvas.width-100,100);
}
function drawNet(){
    for(var i=0;i<canvas.height;i+=40){
        colorRect(canvas.width/2,i,5,20,"white");
    }
}
function colorRect(leftX,topY,width,height,color){
    canvasContext.fillStyle=color;
    canvasContext.fillRect(leftX,topY,width,height,color);
}
function colorCircle(centerX,centerY,radius,color){
    canvasContext.fillStyle=color;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}
function moveEverything(){
    if(count){
        sleep(500);
        count=false;
    }
    if(showWinSCore)
        return;
    ballX+=speedX;
    ballY+=speedY;
    if(ballX<0){
        if(ballY > paddle1y && ballY < paddle1y+PADDLE_HEIGHT){
            speedX=-speedX;
            var delta=ballY - paddle2y+PADDLE_HEIGHT/2;
            speedY=delta * 0.15;
        }
        else{
            player2Score++;
            ballReset();
            hitLeft();
        }

    }
    if(ballX>canvas.width){
        if(ballY > paddle2y && ballY < paddle2y+PADDLE_HEIGHT){
            speedX=-speedX;
            var delta=ballY - paddle2y+PADDLE_HEIGHT/2;
            speedY=delta * 0.10;
        }else{
            player1Score++;
            ballReset();
            hitRight();
        }
    }
    if(ballY<=0)
        speedY=-speedY;
    if(ballY>=canvas.height){
        speedY=-speedY;
    }
}
function hitLeft(){
    colorRect(0,0,20,canvas.height,"red");
}
function hitRight(){
    colorRect(canvas.width-20,0,20,canvas.height,"red");
}
function computerMovement(){
    var paddle2yCenter= paddle2y + PADDLE_HEIGHT/2;
    if(ballY-35 > paddle2yCenter)
        paddle2y+=10;
    else {if(ballY+35 < paddle2yCenter)
        paddle2y-=10;
    }
}
function ballReset(){
    if(player1Score == WINNING_SCORE || player2Score == WINNING_SCORE){
        showWinSCore=true;
    }
    speedX=-speedX;
    ballX=canvas.width/2;
    ballY=canvas.height/2;
    speedY=0;
    count=true;
}
function restart(e){
    if(showWinSCore){
        player1Score=0;
        player2Score=0;
        showWinSCore=false;
    }
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }