const tmi = require('tmi.js')

// Valid commands start with:
let commandPrefix = '!'
// Define configuration options:
let opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.BOT_OAUTH 
  },
  channels: [
    process.env.CHANNEL
  ]
}

// Function called when the "dice" command is issued:
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1
 
}

// Create a client with our options:
let client = new tmi.client(opts)

// Register our event handlers (defined below):
client.on('message', onMessageHandler)
client.on('connected', onConnectedHandler)
client.on('disconnected', onDisconnectedHandler)

// Connect to Twitch:
client.connect()

// Called every time a message comes in:
function onMessageHandler (target, context, msg, self) {
  if (self) { return } // Ignore messages from the bot

  // This isn't a command since it has no prefix:
  if (msg.substr(0, 1) !== commandPrefix) {
    console.log(`[${target} (${context['message-type']})] ${msg}`)
    return
  }

  // Split the message into individual words:
  const parse = msg.slice(1).split(' ')
  // The command name is the first (0th) one:
  const commandName = parse[0]

  // If the command is known, let's execute it:
  if (commandName == 'dice') {
    const num = rollDice()
    client.say(target, `You rolled a ${num}`)
    console.log(`* Executed ${commandName} command`)
  } else {
    console.log(`* Unknown command ${commandName}`)
  }
}

// Called every time the bot connects to Twitch chat:
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`)
}

// Called every time the bot disconnects from Twitch:
function onDisconnectedHandler (reason) {
  console.log(`Disconnected: ${reason}`)
  process.exit(1)
}

const express = require('express')
const app = express();

var listener = app.listen(process.env.PORT, function() {
  console.log('Listening on port ', + listener.address().port)
  app.get('/', (req, res) => res.send('Hello World!'))
});