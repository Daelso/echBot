const { SlashCommandBuilder } = require('discord.js');

const rolesToRemove = ['986278253754998794', '986278261510258728', '986278265054449764', '986301424763813908', '1078779318861303838' ];

const adminRoleId = '769348490848632863';


module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Removes active member roles from users in the case of switching to Warden.'),
  async execute(interaction) {

    try {

      const adminUser = await interaction.guild.members.fetch(interaction.user.id);

      const guild = interaction.guild;


      const hasRole = adminUser.roles.cache.has(adminRoleId);


      if (!hasRole) {
        interaction.reply('You do not have permission to use this command!');
        return;
      }

      rolesToRemove.forEach(async role => {

        guild.roles.fetch(role).then((specificRole) => {
          if (specificRole !== null) {

            const users = specificRole.members.map(m => m.user.id);

            users.forEach(async user => {
              const currentUser = await interaction.guild.members.fetch(user);

              currentUser.roles.remove(role);


            });

          }
        });

      });


      interaction.reply('Traitors have been purged.');
    }
    catch (error) {
      console.log(error);
      interaction.reply('Error, please yell at <@139984589786578944>');
    }

  },

};