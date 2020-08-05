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

  // If the command is known, let's execute it
  if (commandName === '!d20') {
    const num = rollDice(commandName);
    client.say(target, `You rolled a ${num}.`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === '!hype') {
    client.say(
      target,
      `kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype kaetvHeart kaetvHype`
    );
  } else if (commandName === '!hype2') {
    client.say(
      target,
      `kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype kaetvHype `
    );
  } else if (commandName === '!subhype') {
    client.say(
      target,
      `/me ONE OF US! kaetvHype ONE OF US! kaetvHeart ONE OF US! kaetvHype ONE OF US! kaetvHeart ONE OF US! kaetvHype ONE OF US! kaetvHeart ONE OF US! kaetvHype ONE OF US! kaetvHeart`
    );
  } else if (commandName === '!kae') {
    client.say(target, `truuuuuuuuuuuuuuu`);
  } else if (commandName === '!shub') {
    client.say(
      target,
      `ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat ishubbCat`
    );
  } else if (commandName === '!luc') {
    client.say(
      target,
      `https://clips.twitch.tv/TrustworthyFragileSangOMGScoots`
    );
  } else if (commandName === '!ether') {
    client.say(target, `https://www.youtube.com/watch?v=6tfn4uSgY7Y`);
  } else if (commandName === '!catjam') {
    client.say(
      target,
      `catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM catJAM`
    );
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
