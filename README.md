# Twitch Getting Started with Chatbots & IRC
=================

## Chatbot Overview

Twitch offers an Internet Relay Chat (IRC) interface for chat functionality. Chatbots allow you to programmatically interact with a Twitch chat feed using IRC standards; the bot connects to the Twitch IRC network as a client to perform these actions.This guide presents an easy bot example to get you started.

### Building the Bot

We’ll build a simple chatbot that responds in chat when someone types `!dice`. (This is known as a chatbot command.) When triggered, it randomly generates a number between 1-6. We run the fully-functioning chatbot on this Glitch,  as well as show you how to run locally on our [Developer Docs](https://dev.twitch.tv/docs/irc/).

![example-screenshot](https://cdn.glitch.com/1e2f7667-2601-49f0-af69-ba4f114185fe%2Fchatbots-1.png?1545680331607)



### Get Environment Variables

To start, you’ll need three environment variables:

* `BOT_USERNAME` - The account (username) that the chatbot uses to send chat messages. This can be your Twitch account. Alternately, many developers choose to create a second Twitch account for their bot, so it's clear from whom the messages originate.
* `OAUTH_TOKEN` - Generated using an Implicit grant flow. Use this [community tool](https://twitchapps.com/tmi/).
* `CHANNEL_NAME` - The Twitch channel name where you want to run the bot.  


| Variable  |   |   |   |   |
|---|---|---|---|---|
| BOT Username  |  fasdfasdffasd |   |   |   |
|   |   |   |   |   |
|   |   |   |   |   |

### Building the bot


1. To start with this template, click the Remix button in the upper right. 

2. Glitch automatically installs Node, Express and Tmi.js for us.

3. Add the three environmental vars in our [`.env`](https://glitch.com/edit/#!/twitch-chatbot?path=.env:1:0) file.

4. View the code in `bot.js`. 

5. Your chatbot is ready to run! Glitch automatically deploys & runs each version. View the status button to ensure there are no errors. 

6. Try the chatbot! Interact with your channel (twitch.tv/<CHANNEL_NAME>) by trying  the `!echo` command. 

**Note**: This bot connects to the IRC network as a client and isn't designed to respond over HTTP. If you click "Show Live" you will see a simple "Hello World"


## Next Steps

* Read [Chatbots & IRC documentation](https://dev.twitch.tv/docs/irc/guide/).
* Reach out to [@twitchdev](https://twitter.com/twitchdev) or the [forums](https://discuss.dev.twitch.tv/) for help!


