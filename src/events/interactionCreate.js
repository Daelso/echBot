const { Events, EmbedBuilder } = require('discord.js');


module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    // We don't want any PM functionality so just a quick check that this is happening in the server
    if (!interaction.inGuild()) return;


    // Button handling
    if (interaction.isButton()) {
      // reply loader
      await interaction.deferReply({ ephemeral: true });
      // this is a little retarded but we're bouncing embeds instead of using proper slash commands so I'll try to be clean
      const userBtnPrefix = ['recruitment', 'ambassador', 'attache'];

      // customids are set to the button as [buttonlabel]-[assigneduserid], we split them to handle which button is called and prevent other users from touching btns
      const splitArr = interaction.customId.split('-');
      const btnType = splitArr[0];
      const authUserId = splitArr[1];
      const interactorId = interaction.user.id;

      // Compares the original user id from customID with whoever interacts with it, if they don't match we end method.
      // This is to prevent other users from messing with buttons not intended for them.
      // the includes is to only run this check on user interactable buttons and not staff ones
      if (interactorId !== authUserId && userBtnPrefix.includes(btnType)) {
        interaction.editReply({ content: 'That doesn\'t belong to you!' });
        return;
      }

      interaction.editReply({ content:`<@${authUserId}>, a recruiter has been notified, we will get back to you shortly.` });


    }

    // //////////////////////////// Chat command handling below

    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    // Chat commands
    try {

      await command.execute(interaction);

    }
    catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};