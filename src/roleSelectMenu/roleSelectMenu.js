const handleSelectChoice = async (interaction) => {

  try {
    const roleId = interaction.values[0];
    const role = interaction.guild.roles.cache.get(roleId);
    await interaction.deferReply({ ephemeral: true });

    if (!role) {
      interaction.editReply({ content: 'I am unable to locate this role. Try again and see if issue persists.' });
      console.log('User tried to add a role that does not exist? HOW');
      return;
    }

    const hasRole = interaction.member.roles.cache.has(roleId);

    if (hasRole) {
      await interaction.member.roles.remove(roleId);
      interaction.editReply({ content: `The role ${role.name} has been removed!` });
      return;
    }
    await interaction.member.roles.add(roleId);
    interaction.editReply({ content: `The role ${role.name} has been added!` });

  }
  catch (error) {
    console.log(error);
    interaction.editReply({ content: 'Error, please tell Connor to check the error logs. Try again and see if issue persists.' });
  }

};


module.exports = { handleSelectChoice };