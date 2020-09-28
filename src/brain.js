
const configTrain = {
  iterations: 1000, // the maximum times to iterate the training data --> number greater than 0
  errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
  log: true, // true to use console.log, when a function is supplied it is used --> Either true or a function
  logPeriod: 10, // iterations between logging out --> number greater than 0
  learningRate: 0.3, // scales with delta to effect training rate --> number between 0 and 1
  momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
  callback: null, // a periodic call back that can be triggered while training --> null or function
  callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
  timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0
};

const config = {
  inputSize: 2,
  inputRange: 2,
  hiddenLayers: [20, 20],
  outputSize: 1,
  learningRate: 0.01,
  decayRate: 0.999,
};

class MyBrain {
  currentTrain = []
  network = null
  pontuacaoMax = 0

  constructor() {
    this.network = new brain.recurrent.RNN(config);
    this.network.fromJSON(MODEL)
    //this.network.train(TRAIN, configTrain)
    //const json = this.network.toJSON();
    //console.log(JSON.stringify(json))
  }

  predict(x_player, x_point) {
    return this.network.run([x_player, x_point])
  }

  train(x_player, x_point, direction) {
    this.currentTrain.push({ input: [x_player, x_point], output: [direction] })
    document.getElementById('train').innerHTML = JSON.stringify(ia.currentTrain)
  }

  nextGeneration(pontuacao) {
    if (pontuacao > this.pontuacaoMax) {
      const net = new brain.recurrent.RNN(config);
      net.fromJSON(this.network.toJSON())
      this.network = net
      this.pontuacaoMax = pontuacao
    } else {
      console.log(this.network)
    }
  }

  play(player, point) {
    console.log(player.x, point.x)
    const predict = parseInt(this.predict(player.x, point.x))
    console.log(predict)
    if (predict == 0) { // LEFT
      if (player.x > 0)
        player.x -= SPEED
      lastKey = 0
    } else if (predict == 1) { // RIGHT 
      if (player.x + player.width < 500)
        player.x += SPEED
      lastKey = 1
    }
  }
}