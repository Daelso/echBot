const { Events, Collection, ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// Collections are an extension of a Map function more or less, AKA a fresh array

const voiceCollection = new Collection();


const roleId = '769253180050636840';
const creatorChannel = '1081294616097206352';


module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(oldState, newState) {

    try {


      if (newState.channel !== null) {


        if (newState.channel.id === creatorChannel) {
          const user = newState.member;

          const hasRole = user.roles.cache.has(roleId);

          if (!hasRole) return;


          const channel = await newState.guild.channels.create({
            name: `${user.user.username}'s temp vc`,
            type: ChannelType.GuildVoice,
            parent: newState.channel.parent,
          });
          user.voice.setChannel(channel);
          voiceCollection.set(user.id, channel.id);


          const channelEmbed = new EmbedBuilder().setTitle('Echelon Channel Builder')
            .setDescription(`<@${user.id}>, please use the buttons below to customize your channel. This channel is designed to be temporary and will automatically delete when all users leave.`)
            .setColor('Green')
            .setTimestamp()
            .setThumbnail('https://www.echclan.net/img/ECHLogo.73a81d16.png')
            .setFooter({ text: 'Wardens go away', iconURL: 'https://www.echclan.net/img/ECHLogo.73a81d16.png' });

          const actionRow = new ActionRowBuilder();
          actionRow.components.push(new ButtonBuilder().setCustomId(`changeChannelName-${channel.id}`).setLabel('✍🏻 Set Channel Name').setStyle(ButtonStyle.Secondary));
          actionRow.components.push(new ButtonBuilder().setCustomId(`changeUserLimit-${channel.id}`).setLabel('🤼 Set User Limit').setStyle(ButtonStyle.Secondary));


          channel.send({ embeds: [channelEmbed], components:[actionRow] });
        }
      }


      if (newState.channel === null || (oldState.channel !== null && newState.channel.id !== oldState.channel.id)) {

        // if user leaves vc altogether or switches to another channel we trigger a loop through our collection of temp channels held in memory
        // any temp channels that have 0 users left will get deleted

        voiceCollection.forEach(async x => {

          const curChannel = await oldState.guild.channels.fetch(x);

          if (curChannel.members.size === 0) {
            curChannel.delete();
          }

        });

      }
    }
    catch (error) {
      console.log(error);
    }


  },
};