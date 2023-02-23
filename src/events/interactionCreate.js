const { Events, EmbedBuilder } = require('discord.js');
const ballResponses = require('../../json/8ballResponses.json').responses;


module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    try {
      if (interaction.commandName === '8ball') {
        const question = interaction.options.get('question').value;
        const response = ballResponses[(Math.random() * ballResponses.length) | 0];

        const ballEmbed = new EmbedBuilder().setTitle(`🎱 ${question}`).setDescription(`${response}`).setColor('Random').addFields({ name: 'Asked By:', value: `${interaction.member.user.username}` }).setTimestamp();


        interaction.reply({ embeds: [ballEmbed] });
      }

      if (interaction.commandName === 'embed') {
        const belle = interaction.guild.emojis.cache.find(emoji => emoji.name === 'goth');
        const embed = new EmbedBuilder().setTitle('Embed Title').setDescription('meme');

        const message = await interaction.reply({ content: 'You can react with custom emojis!', fetchReply: true });

        message.react(belle);

      }
    }
    catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};