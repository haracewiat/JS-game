var canvas = document.getElementById("canvas");
var game = canvas.getContext('2d');


//constant values
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const SIDE_OFFSET = 15;
const TOP_OFFSET = 5;

const PADDLE_WIDTH = 60;
const PADDLE_HEIGHT = 4;

const BALL_HEIGHT = 3;
const BALL_WIDTH = BALL_HEIGHT*2.5;
const BALL_SPEED = 2.5;

const BRICKS_ROW = 6;
const BRICKS_COLUMN = 6;
const BRICK_WIDTH = (CANVAS_WIDTH-SIDE_OFFSET*2)/BRICKS_ROW;
const BRICK_HEIGHT = 8;


//objects
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

var paddle = {

    height: PADDLE_HEIGHT,
    width: PADDLE_WIDTH,
    x: CANVAS_WIDTH/2 - PADDLE_WIDTH/2,
    y: CANVAS_HEIGHT - PADDLE_HEIGHT - 6,
    x_velocity: 0
  
};

var ball = {

    height: BALL_HEIGHT,
    width: BALL_WIDTH,
    x: CANVAS_WIDTH/2,
    y: CANVAS_HEIGHT - PADDLE_HEIGHT - 6 - BALL_HEIGHT,
    x_velocity: BALL_SPEED,
    y_velocity: BALL_SPEED 

}

var Brick = function(x, y) {

    this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
    this.height = BRICK_HEIGHT;
    this.width = BRICK_WIDTH;
    this.x = SIDE_OFFSET + x;
    this.y = TOP_OFFSET + y;
    this.delete = false;

}

var bricks = new Array();

for(let i = 0; i < BRICKS_ROW; i ++) {
    for(let j = 0; j < BRICKS_COLUMN; j ++) {
        bricks.push(new Brick(i*BRICK_WIDTH, j*BRICK_HEIGHT));
    } 
}


var loop = function() {

//move the paddle
    if(controller.left){  
    paddle.x_velocity -= 1.5;  
    }else if(controller.right){  
    paddle.x_velocity += 1.5;  
    }

    paddle.x += paddle.x_velocity;
    paddle.x_velocity *= 0.8;                      
  
//create boundries for the paddle (don't let it fall out of the canvas)
    if(paddle.x < 0){  
        paddle.x = 0;
    }else if(paddle.x > CANVAS_WIDTH - PADDLE_WIDTH){
        paddle.x = CANVAS_WIDTH - PADDLE_WIDTH;
    }

//move the ball
    ball.x += ball.x_velocity;
    ball.y += ball.y_velocity;

//create boundries for the ball (don't let it fall out of the canvas)
    //top and bottom
    if(ball.y > CANVAS_HEIGHT - BALL_HEIGHT || ball.y < 0 + BALL_HEIGHT){
        ball.y_velocity = -ball.y_velocity;
    }

    //sides
    if(ball.x > CANVAS_WIDTH - BALL_WIDTH || ball.x < 0  + BALL_WIDTH){  
        ball.x_velocity = -ball.x_velocity;
    }

    //paddle collision
    let ballBottom = ball.y + ball.height/2;
    let paddleTop = paddle.y;
    let paddleLeft = paddle.x;
    let paddleRight = paddle.x + paddle.width;

    if(ballBottom > paddleTop && ball.x + ball.width/2 >= paddleLeft && ball.x - ball.width/2 <= paddleRight){
        ball.y_velocity = -ball.y_velocity;
        ball.y =  paddle.y - ball.height/2;
    }
    
    /*
    //brick collision
    let ballTop = ball.y - ball.height/2;
    let brickBottom = brick.y + BRICK_HEIGHT;

    if(ballTop < brickBottom){
        ball.y_velocity = -ball.y_velocity;
        ball.y =  brick.y + BRICK_HEIGHT + ball.height/2;        
    }
    */
  
//draw the game    

    //background for the game
    game.fillStyle = "rgba(32, 32, 32, 1)";
    game.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //paddle
    game.fillStyle = "#dfa6ea";
    game.beginPath();
    game.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    game.fill();

    //ball
    game.fillStyle = "#db4fb8";
    game.beginPath();
    game.ellipse(ball.x, ball.y, ball.width, ball.height, 0, 0, 2 * Math.PI);
    game.fill();

    //bricks
    for(let i=0; i < bricks.length; i++) {

        let brick = bricks[i];

        if (brick.delete == false){
            game.fillStyle = brick.color;
            game.beginPath();
            game.rect(brick.x, brick.y, brick.width, brick.height);
            game.fill();
        }

      }
    
    

//call update when the browser is ready to draw again
    window.requestAnimationFrame(loop);
    
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);

window.requestAnimationFrame(loop);

