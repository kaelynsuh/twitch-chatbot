# Twitch Chatbot Getting Started 
=================

## Chatbot Overview

Twitch offers an IRC interface to chat functionality. Chatbots allow you to programmatically interact with a chat feed using IRC standards. The bot will then connect to Twitch's IRC network as a client and begin performing actions. 

### Authentication

Authenticating your chatbot with Twitch's servers is required. In a production setting, you should [register your app](https://dev.twitch.tv/docs/authentication/#registration) and use the standard Authorization code flow. In this guide, for the sake of getting started quickly, we generate an OAuth token directly using a community [tool](https://twitchapps.com/tmi/). You can read more about authentication [here](https://dev.twitch.tv/docs/authentication/). 


## Basic Chatbot

We will build a simple bot that uses the`!echo` command. When triggered, it will repeat and display the user's message. We will use [tmi.js](https://docs.tmijs.org/) which is a community driven wrapper around Twitch's API.  

![example-screenshot](https://cdn.glitch.com/1e2f7667-2601-49f0-af69-ba4f114185fe%2Fchatbot-example.png?1544046380305)

### Credentials

You will need:

* `BOT_USERNAME` - Your Twitch account's username. Note: If you aren't comfortable granting API access to your primary account, you can create an additional Twitch account to act as your bot.
* `OAUTH_TOKEN` - Generated using an Implicit grant flow. Use this [community tool](https://twitchapps.com/tmi/).
* `CHANNEL_NAME` - The Twitch channel name where you want to run the bot.  

### Building the bot


1. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)

2. Using npm, install tmi.js 

    `npm install tmi.js`

3. View and replace the three variables in `bot.js`. 

4. Run `bot.js`. This can be run locally using Node.

`node bot.js`

You can also run this remotely using Glitch.

5. Now that the bot is running and connected to Twitch's IRC network we can interact with it. On twitch.tv/<CHANNEL_NAME>, try using the `!echo` command. 

`!echo testing my chatbot` 


### Using Glitch
 
Glitch lets you instantly create, edit, and host an app in the cloud. The code for this tutorial is already live and can be accessed here. Simply, put in your credentials and click run.

## Next Steps

* Read [Chatbots & IRC documentation](https://dev.twitch.tv/docs/irc/guide/).
* Reach out to [@twitchdev]() or the [forums] for help!


