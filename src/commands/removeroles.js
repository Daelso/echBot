const { SlashCommandBuilder } = require('discord.js');

const rolesToRemove = ['986278253754998794', '986278261510258728', '986278265054449764', '986301424763813908' ];

const adminRoleId = '769348490848632863';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removeroles')
    .setDescription('Removes active member roles from the input user in the case of switching to Warden.'),
  async execute(interaction) {

    try {
      const targetUser = interaction.options.get('user').user.id;

      const adminUser = await interaction.guild.members.fetch(interaction.user.id);


      const guildTarget = await interaction.guild.members.fetch(targetUser);


      const hasRole = adminUser.roles.cache.has(adminRoleId);


      if (!hasRole) {
        interaction.reply('You do not have permission to use this command!');
        return;
      }


      rolesToRemove.forEach(async role => {
        await guildTarget.roles.remove(role);
      });

      interaction.reply(`Roles successfully removed from <@${targetUser}>`);
    }
    catch (error) {
      console.log(error);
      interaction.reply('Error, please yell at <@139984589786578944>');
    }

  },

};