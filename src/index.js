/* eslint-disable no-undef */
const { Client, IntentsBitField } = require('discord.js');
const path = require('node:path');
const fs = require('fs');

require('dotenv').config();


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildInvites,
    IntentsBitField.Flags.AutoModerationConfiguration,
    IntentsBitField.Flags.AutoModerationExecution,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.DirectMessageTyping,
    IntentsBitField.Flags.DirectMessageReactions,
    IntentsBitField.Flags.GuildModeration,

  ],
});


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  }
  else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}


client.on('ready', (c) => {
  console.log(` ${c.user.tag} is online.`);
});


client.on('messageCreate', (msg) => {
  // prevents possible bot trolling
  if (msg.author.bot) {
    return;
  }

  if (msg.content === 'Evan') {msg.reply('Why');}
});


client.login(process.env.TOKEN);