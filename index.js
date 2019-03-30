var canvas = document.getElementById("canvas");
var game = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const PADDLE_WIDTH = 60;
const PADDLE_HEIGHT = 4;


var paddle = {

    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    x: CANVAS_WIDTH/2 - PADDLE_WIDTH/2,
    y: CANVAS_HEIGHT - PADDLE_HEIGHT - 10,
    x_velocity: 0
  
};

var controller = {

    left: false,
    right: false,

    keyListener: function(event){

        var key_state = (event.type == "keydown") ? true : false;

        switch(event.keyCode){
            case 37:                              // left key
                controller.left = key_state;
            break;
            case 39:                              // right key
                controller.right = key_state;
            break;
        }
    }

};

var loop = function() {

   
    if(controller.left){  
      paddle.x_velocity -= 1.5;  
    }
  
    if(controller.right){  
      paddle.x_velocity += 1.5;  
    }
 
   
    paddle.x += paddle.x_velocity;
    paddle.x_velocity *= 0.8;                      
  
   
    if(paddle.x < 0){  
        paddle.x = 0;
    }else if(paddle.x > CANVAS_WIDTH - PADDLE_WIDTH){
        paddle.x = CANVAS_WIDTH - PADDLE_WIDTH;
    }

  
    //draw the game    
    //background for the game
    game.fillStyle = "#202020";
    game.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //paddle
    game.fillStyle = "#dfa6ea";
    game.beginPath();
    game.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    game.fill();

    
    
    //call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);
    
  };

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

