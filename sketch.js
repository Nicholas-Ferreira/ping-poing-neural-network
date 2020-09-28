/// <reference path="node_modules/@types/p5/global.d.ts" />

let GRAVITY = 4
let SPEED = 30
let game = null
let player = null
let point = null
let ia = null
let lastKey = null

function setup() {
  createCanvas(500, 500);
  ia = new MyBrain()
  player = new Player()
  point = new Point()
  game = new Game(player, point)
  game.onGameOver = () => {
    game.reset()
    ia.nextGeneration(game.pontuacao)
    game.generation += 1
  }
  game.onPointed = () => {
    ia.train(player.x, point.x, lastKey)
  }
}

function draw() {
  background(220);
  game.update()
  ia.play(player, point)
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) { // 0
    if (player.x > 0)
      player.x -= SPEED
    lastKey = 0
    ia.train(player.x, point.x, lastKey)
  } else if (keyCode == RIGHT_ARROW) { // 1
    if (player.x + player.width < 500)
      player.x += SPEED
    lastKey = 1
    ia.train(player.x, point.x, lastKey)
  }
}


