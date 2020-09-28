/// <reference path="node_modules/@types/p5/global.d.ts" />

let GRAVITY = 50
let SPEED = 30
let game = null
let player = null
let point = null
let ia = null
let lastKey = null

const STOPPED = 'stopped'
const LEFT = 'left'
const RIGHT = 'right'

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
    ia.train(player.x, point.x, STOPPED)
  }
}

function draw() {
  background(220);
  game.update()
  ia.play(player, point, true)
}

function keyPressed() {
  if (keyCode == LEFT_ARROW && player.x > 0) { // 0
    player.x -= SPEED
    ia.train(player.x, point.x, LEFT)
  } else if (keyCode == RIGHT_ARROW && player.x + player.width < 500) { // 1
    player.x += SPEED
    ia.train(player.x, point.x, RIGHT)
  }
}


