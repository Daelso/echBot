/* eslint-disable no-undef */
const { Client, IntentsBitField} = require('discord.js');
const ballResponses = require('../json/8ballResponses.json').responses;
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

  ]
});

client.on('ready', (c) => {
  console.log(` ${c.user.tag} is online.`);
});


client.on('messageCreate', (msg) => {
  //prevents possible bot trolling
  if(msg.author.bot) {
    return;
  }

  if(msg.content === 'Evan')
    msg.reply('Why');
});


client.on('interactionCreate', (interaction) => {
  if(!interaction.isChatInputCommand()) return;


  if(interaction.commandName === '8ball'){
    const asker = interaction.member.user.username;
    const question = interaction.options.get('question').value;
    const response = ballResponses[(Math.random() * ballResponses.length) | 0];

    interaction.reply(`${asker} asks: ${question} - Magic 8 Ball Response: ${response}`);
  }

});

client.login(process.env.TOKEN);