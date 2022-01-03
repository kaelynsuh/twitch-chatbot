require('dotenv').config();
const config = require("./config.json")

const tmi = require('tmi.js');

// Define configuration options
const opts = {
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};

console.log('opts', opts)

// Create a client with our options
const client = new tmi.client(opts);
console.log('client', client);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  console.log('target', target);
  console.log('context', context);
  console.log('msg', msg);
  console.log('self', self);
  console.log('///////////');

  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
  const botId = config.twitch_id;
  const userId = context['user-id'];

  console.log('commandName', commandName);
  console.log('botId', botId);
  console.log('userId', userId);
  console.log('////////////////////////////');


  const mods = config.mods

  const userMatch = config.targets

  // dice
  if (commandName.match(/!d(\d+)/)) {
    // dice
    let re = /!d(\d+)/;
    let result = msg.match(re);
    let sides = result[1];
    const num = rollDice(sides);
    client.say(target, `You rolled a ${num}.`);
  }
  
  // ban bot
  // TODO: make sure userId matches the bots listed somewhere
  // but I dont want to provide a bot id.. maybe the username
  if (msg.match(/(\d+)% peepoShy/)) {
    let re = /(.*), your love compatibility with (.*) is like a (\d+)% peepoShy/;
    let result = msg.match(re);
    let sender = result[1]; // inomicecream
    let user = result[2]; // kae_tv
    let pct = result[3]; // 73

    if (result && userMatch.includes(user) && pct < config.thresholds['pass']) {
      setTimeout(async () => {
        await client.say(target, `/ban ${sender}`);

        setTimeout(async () => {
          await client.say(target, `/unban ${sender}`);
          if (mods.includes(sender)) {
            client.say(target, `/mod ${sender}`);
          }
        }, (1000 * config.timers.ban_countdown) ); 

      }, (1000 * config.timers.ban_duration) ); // 1000 * seconds = milliseconds
    }
  }
}

// Function called when the "dice" command is issued
function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
