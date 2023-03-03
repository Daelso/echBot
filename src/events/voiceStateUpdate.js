const { Events, Collection, ChannelType } = require('discord.js');

const voiceCollection = Collection;

const welcomeChannelId = '1078176167321948192';


module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(oldState, newState) {

    if (newState.channel !== null) {
      if (newState.channel.id === '1080998893132718130') {
        const user = newState.member;
        console.log(user);
        console.log('we in evanville');

        const channel = await newState.guild.channels.create({
          name: 'I hate Evan',
          type: ChannelType.GuildVoice,
          parent: newState.channel.parent,
        });
        user.voice.setChannel(channel);
      }
    }


    if (newState.channel === null) {
      console.log('we have left evan town');


    }


  },
};