class Point {
  size = 10

  constructor() {
    this.respawn()
  }

  show() {
    fill(0)
    rect(this.x, this.y, this.size, this.size)
    this.y += GRAVITY
  }

  respawn() {
    this.y = 0
    this.x = Math.round(getRandom(0, 500 - this.size))
  }
}