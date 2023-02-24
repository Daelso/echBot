const { Events, EmbedBuilder } = require('discord.js');
const ballResponses = require('../../json/8ballResponses.json').responses;


module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // We don't want any PM functionality so just a quick check that this is happening in the server
    if (!interaction.inGuild()) return;


    // Button handling
    if (interaction.isButton()) {
      // reply loader
      await interaction.deferReply({ ephemeral: true });

      // customids are set to the button as [buttonlabel]-[assigneduserid], we split them to handle which button is called and prevent other users from touching btns
      const splitArr = interaction.customId.split('-');
      const btnType = splitArr[0];
      const authUserId = splitArr[1];
      const interactorId = interaction.user.id;

      // Compares the original user id from customID with whoever interacts with it, if they don't match we end method.
      // This is to prevent other users from messing with buttons not intended for them.
      if (interactorId !== authUserId) {
        interaction.editReply({ content: 'That doesn\'t belong to you!' });
        return;
      }

      interaction.editReply({ content:`<@${authUserId}>, a recruiter has been notified, we will get back to you shortly.` });


    }


    if (!interaction.isChatInputCommand()) return;


    // Various chat commands
    try {
      if (interaction.commandName === '8ball') {
        const question = interaction.options.get('question').value;
        const response = ballResponses[(Math.random() * ballResponses.length) | 0];

        const ballEmbed = new EmbedBuilder().setTitle(`🎱 ${question}`).setDescription(`${response}`).setColor('Random').addFields({ name: 'Asked By:', value: `${interaction.member.user.username}` }).setTimestamp();


        interaction.reply({ embeds: [ballEmbed] });
      }

    }
    catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};