require('dotenv').config();

const tmi = require('tmi.js');

// Define configuration options
const opts = {
  // options: { debug: true },
  // connection: {
  //   reconnect: true,
  //   secure: true,
  // },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();
  const kaeId = 513203757;
  const commandUserId = context['user-id'];

  const mods = [
    'mtniss',
    'communicans',
    'jennyouch',
    'ludicrouslyliam',
    'shaynigami',
    'robindesu',
    'fuchs_',
    'totallynotatwork64',
    'virtrand',
    'infinitynier',
    'ludicrouslyluc',
    'justether',
    'griffuuu',
    'inomicecream',
  ];

  const userMatch = ['kae_tv', 'kae', 'kaelyn'];

  if (commandName.match(/!d(\d+)/)) {
    // dice
    let re = /!d(\d+)/;
    let result = msg.match(re);
    let sides = result[1];
    const num = rollDice(sides);
    client.say(target, `You rolled a ${num}.`);
  } else if (commandUserId == kaeId && msg.match(/(\d+)% peepoShy/)) {
    // ban bot
    let re = /(.*), your love compatibility with (.*) is like a (\d+)% peepoShy/;
    let result = msg.match(re);
    let sender = result[1]; // inomicecream
    let user = result[2]; // kae_tv
    let pct = result[3]; // 73

    if (result && userMatch.includes(user) && pct < 50) {
      client.say(target, `/ban ${sender}`);

      setTimeout(async () => {
        await client.say(target, `/unban ${sender}`);
        if (mods.includes(sender)) {
          client.say(target, `/mod ${sender}`);
        }
      }, 2000);
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
