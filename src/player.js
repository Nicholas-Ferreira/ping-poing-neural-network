
class Player {
  width = 100
  height = 10

  constructor() {
    this.x = 200
    this.y = 500 - this.height - 5
  }

  show() {
    rect(this.x, this.y, this.width, this.height)
  }

  reset() {
    this.x = (500 / 2) - this.width / 2
    this.y = 500 - this.height - 5
  }
}