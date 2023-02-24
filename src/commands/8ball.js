const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ballResponses = require('../../json/8ballResponses.json').responses;


module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Returns a magic 8 ball response to your question.'),
  async execute(interaction) {
    const question = interaction.options.get('question').value;
    const response = ballResponses[(Math.random() * ballResponses.length) | 0];

    const ballEmbed = new EmbedBuilder().setTitle(`🎱 ${question}`).setDescription(`${response}`).setColor('Random').addFields({ name: 'Asked By:', value: `${interaction.member.user.username}` }).setTimestamp();


    interaction.reply({ embeds: [ballEmbed] });
  },
};