
const configTrain = {
  iterations: 1000, // the maximum times to iterate the training data --> number greater than 0
  errorThresh: 0.005, // the acceptable error percentage from training data --> number between 0 and 1
  log: true, // true to use console.log, when a function is supplied it is used --> Either true or a function
  logPeriod: 10, // iterations between logging out --> number greater than 0
  learningRate: 0.99, // scales with delta to effect training rate --> number between 0 and 1
  momentum: 0.1, // scales with next layer's change value --> number between 0 and 1
  callback: null, // a periodic call back that can be triggered while training --> null or function
  callbackPeriod: 10, // the number of iterations through the training data between callback calls --> number greater than 0
  timeout: Infinity, // the max number of milliseconds to train for --> number greater than 0
};

const config = {
  binaryThresh: 0.05,
  hiddenLayers: [20], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

class MyBrain {
  currentTrain = []
  network = null
  pontuacaoMax = 0

  constructor() {
    console.log(TRAIN)
    this.network = new brain.NeuralNetwork(config);
    this.network.train(TRAIN, configTrain)
    //this.network.fromJSON(MODEL)
    //const json = this.network.toJSON();
    //console.log(JSON.stringify(json))
  }

  predict(x_player, x_point) {
    console.log({ x_player, x_point })
    return this.network.run({ x_player, x_point })
  }

  train(x_player, x_point, status) {
    const data = {
      input: { x_player, x_point },
      output: { [status]: 1 }
    }
    this.currentTrain.push(data)
    document.getElementById('train').innerHTML = JSON.stringify(ia.currentTrain)
  }

  nextGeneration(pontuacao) {
    if (pontuacao > this.pontuacaoMax) {
      const net = new brain.NeuralNetwork(config);
      net.fromJSON(this.network.toJSON())
      this.network = net
      this.pontuacaoMax = pontuacao
    } else {

    }
  }

  play(player, point, move = true) {
    const predict = this.predict(player.x, point.x)
    const { stopped, left, right } = predict
    console.log(predict)
    if (!move) return
    if ((left > right && left > stopped) && (player.x > 0)) { // LEFT
      player.x -= SPEED
    } else if ((right > left && right > stopped) && player.x + player.width < 500) { // RIGHT 
      player.x += SPEED
    } else {

    }
  }
}