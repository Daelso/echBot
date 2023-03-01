const { SlashCommandBuilder } = require('discord.js');

const rolesToRemove = ['986278253754998794', '986278261510258728', '986278265054449764', '986301424763813908' ];

const adminRoleId = '769348490848632863';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removeroles')
    .setDescription('Removes roles from the input user.'),
  async execute(interaction) {
    const targetUser = interaction.options.get('user').user.id;


    const guildTarget = await interaction.guild.members.fetch(targetUser);

    const hasRole = guildTarget.roles.cache.has(adminRoleId);


    if (!hasRole) {
      interaction.reply('You do not have permission to use this command!');
      return;
    }


    rolesToRemove.forEach(async role => {
      await guildTarget.roles.remove(role);
    });

    interaction.reply(`Roles successfully removed from <@${targetUser}>`);

  },

};