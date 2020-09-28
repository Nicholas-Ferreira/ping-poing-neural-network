/// <reference path="../node_modules/@types/p5/global.d.ts" />

class Game {
  onGameOver = () => { }
  onPointed = () => { }
  generation = 0

  constructor(player, point) {
    this.point = point
    this.player = player
    this.pontuacao = 0
  }

  update() {
    text(`Pontuação: ${this.pontuacao}`, 5, 15)
    text(`Geração: ${this.generation}`, 5, 30)
    text(`Melhor Gen: ${ia.pontuacaoMax}`, 5, 45)
    this.point.show()
    this.player.show()

    const pegou = this.pegou()
    if (pegou) {
      this.pontuacao++
      this.point.respawn()
      this.onPointed()
    }

    if (this.point.y > 500) {
      this.gameOver()
    }
  }

  reset() {
    this.point.respawn()
    this.player.reset()
  }

  pegou() {
    return collideRectRect(
      this.point.x, this.point.y, this.point.size, this.point.size,
      this.player.x, this.player.y, this.player.width, this.player.height
    );
  }

  gameOver() {
    this.pontuacao = 0
    this.onGameOver()
  }
}