/**
 * app.js
 * Main application script
 */
"use strict";

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var pongSound = new Audio("/sounds/pong.wav");
var gameOverSound = new Audio("/sounds/game-over.wav");
var gameState;

function resizeCanvas() {
    var docElem = document.documentElement;
    canvas.width = docElem.clientWidth;
    canvas.height = docElem.clientHeight;
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas);

// advance animation one step
function step(timestamp) {
    var ball = gameState.ball;
    ball.x += ball.vectorX * ball.velocity;
    ball.y += ball.vectorY * ball.velocity;

    // bounce the ball if it hits bottom or top
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.vectorY = -ball.vectorY;
        pongSound.play();
    }

    // bounce of right wall
    if (ball.x + ball.radius >= canvas.width) {
        ball.vectorX = -ball.vectorX;
        pongSound.play();
    }

    // bounce if hit paddle
    var paddle = gameState.paddle;
    if (ball.x - ball.radius <= paddle.x + paddle.width) {
        if (ball.y + ball.radius >= paddle.y && ball.y - ball.radius <= paddle.y + paddle.height) {
            ball.vectorX = -ball.vectorX;
            pongSound.play();
        } else {
            gameOverSound.play();
            return false;
        }
    }

    if (timestamp - ball.lastVelocityIncrease > 1000) {
        ball.lastVelocityIncrease = timestamp;
        ball.velocity++;
    }
    return true;
}

// render gamestate to the canvas context
function render(state) {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    // render the ball
    ctx.beginPath();
    ctx.arc(state.ball.x, state.ball.y, state.ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // render the paddle
    ctx.fillRect(state.paddle.x, state.paddle.y, state.paddle.width, state.paddle.height);
}

// step and then render
function animate(timestamp) {
    // step the animation and keep going
    // if step returns true
    if (step(timestamp)) {
        requestAnimationFrame(animate);
    }

    render(gameState);
}

// start a new game
function startGame() {
    gameState = {
        ball: {
            x: 50,
            y: 50,
            radius: 10,
            vectorX: 1,
            vectorY: 1,
            velocity: 3,
            lastVelocityIncrease: performance.now()
        },
        paddle: {
            x: 10,
            y: 10,
            width: 10,
            height: canvas.height / 6
        }
    };
    requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", function(evt) {
    var paddle = gameState.paddle;
    paddle.y = evt.clientY - (paddle.height / 2);

});
startGame();