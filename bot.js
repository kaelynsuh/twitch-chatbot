const tmi = require('tmi.js');

// Valid commands start with:
const commandPrefix = '!';
// Define configuration options:
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options:
const client = new tmi.Client(opts);

// Register our event handlers (defined below):
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.on('disconnected', onDisconnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in:
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // This isn't a command since it has no prefix:
  if (msg[0] !== commandPrefix) {
    console.log(`[${target} (${context['message-type']})] ${msg}`);
    return;
  }

  // Split the message into individual words:
  const parse = msg.slice(1).split(' ');
  // The command name is the first (0th) one:
  const commandName = parse[0].toLowerCase();

  // If the command is known, let's execute it:
  if (commandName === 'dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued:
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat:
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Called every time the bot disconnects from Twitch:
function onDisconnectedHandler (reason) {
  console.log(`Disconnected: ${reason}`);
  process.exit(1);
}