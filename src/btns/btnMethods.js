const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// This file handles individual button functions, just keeping stuff clean, there will be some repetition please forgive me coding gods

const staffActionRow = new ActionRowBuilder();

// Our various role ids below

const staffChannelId = '1079167174997987359';

const recruiterRoleId = '1078779318861303838';

const welcomeChannelId = '1078176167321948192';

const recruitRoleId = '1079630362981974027';

const ambassadorRoleId = '1079645434026393600';

const attacheRoleId = '1079647502208344114';


const recruitToStaff = async (interaction) => {

  const recruitId = interaction.user.id;


  const recruitEmbed = new EmbedBuilder().setTitle('A new recruit has appeared!')
    .setDescription(`<@${recruitId}> has applied as a new recruit, please select an option below.`)
    .setColor('Random')
    .setTimestamp()
    .setThumbnail('https://www.echclan.net/img/ECHLogo.73a81d16.png')
    .setImage(interaction.user.displayAvatarURL({ dynamic:true, size:512 }));

  staffActionRow.components.push(new ButtonBuilder().setCustomId(`grantRecruit-${recruitId}`).setLabel('Grant Recruit Role').setStyle(ButtonStyle.Primary));
  staffActionRow.components.push(new ButtonBuilder().setCustomId(`delay-${recruitId}`).setLabel('Be With Them Shortly').setStyle(ButtonStyle.Secondary));
  staffActionRow.components.push(new ButtonBuilder().setCustomId(`deny-${recruitId}`).setLabel('Deny').setStyle(ButtonStyle.Danger));


  await interaction.guild.channels.fetch(staffChannelId)
    .then(channel => {
      channel.send({ content: `<@&${recruiterRoleId}>` });
      channel.send({ embeds: [recruitEmbed], components: [staffActionRow] });
    });

};


const ambassadorToStaff = async (interaction) => {

  const recruitId = interaction.user.id;


  const recruitEmbed = new EmbedBuilder().setTitle('A potential ally is reaching out!')
    .setDescription(`<@${recruitId}> has applied as an Allied Ambassador, please select an option below.`)
    .setColor('Random')
    .setTimestamp()
    .setThumbnail('https://www.echclan.net/img/ECHLogo.73a81d16.png')
    .setImage(interaction.user.displayAvatarURL({ dynamic:true, size:512 }));

  staffActionRow.components.push(new ButtonBuilder().setCustomId(`grantAmbassador-${recruitId}`).setLabel('Grant Ambassador Role').setStyle(ButtonStyle.Primary));
  staffActionRow.components.push(new ButtonBuilder().setCustomId(`delay-${recruitId}`).setLabel('Be With Them Shortly').setStyle(ButtonStyle.Secondary));
  staffActionRow.components.push(new ButtonBuilder().setCustomId(`deny-${recruitId}`).setLabel('Deny').setStyle(ButtonStyle.Danger));


  await interaction.guild.channels.fetch(staffChannelId)
    .then(channel => {
      channel.send({ content: `<@&${recruiterRoleId}>` });
      channel.send({ embeds: [recruitEmbed], components: [staffActionRow] });
    });

};

const attacheToStaff = async (interaction) => {

  const recruitId = interaction.user.id;


  const recruitEmbed = new EmbedBuilder().setTitle('An allied attache needs assistance!')
    .setDescription(`<@${recruitId}> is looking to receive the allied attache role, please select an option below.`)
    .setColor('Random')
    .setTimestamp()
    .setThumbnail('https://www.echclan.net/img/ECHLogo.73a81d16.png')
    .setImage(interaction.user.displayAvatarURL({ dynamic:true, size:512 }));

  staffActionRow.components.push(new ButtonBuilder().setCustomId(`grantAttache-${recruitId}`).setLabel('Grant Attache Role').setStyle(ButtonStyle.Primary));
  staffActionRow.components.push(new ButtonBuilder().setCustomId(`delay-${recruitId}`).setLabel('Be With Them Shortly').setStyle(ButtonStyle.Secondary));
  staffActionRow.components.push(new ButtonBuilder().setCustomId(`deny-${recruitId}`).setLabel('Deny').setStyle(ButtonStyle.Danger));


  await interaction.guild.channels.fetch(staffChannelId)
    .then(channel => {
      channel.send({ content: `<@&${recruiterRoleId}>` });
      channel.send({ embeds: [recruitEmbed], components: [staffActionRow] });
    });

};

const beWithYouSoon = async (interaction, recruitId) => {

  await interaction.guild.channels.fetch(welcomeChannelId)
    .then(channel => {
      channel.send({ content: `<@${recruitId}>, <@${interaction.user.id}> has seen your application and will be in touch with you shortly!` });
    });


};

const denied = async (interaction, recruitId) => {


  // Sends our message to recruit and logs the interaction in staff channel, then deletes our embed to prevent spam
  await interaction.guild.channels.fetch(welcomeChannelId)
    .then(channel => {
      channel.send({ content: `<@${recruitId}>, <@${interaction.user.id}> has DENIED your application. Thank you for applying.` });
    });

  await interaction.guild.channels.fetch(staffChannelId)
    .then(channel => {
      channel.send({ content: `<@${interaction.user.id}> has DENIED <@${recruitId}>'s application.` });
    });

  // Deletes and closes the interaction
  interaction.message.delete();

};


// Below are strictly role granting interactions

const grantRecruit = async (interaction, recruitId) => {

  const recruit = await interaction.guild.members.fetch(recruitId);

  const hasRole = recruit.roles.cache.has(recruitRoleId);

  const staffChannel = await interaction.guild.channels.fetch(staffChannelId);

  try {

    if (hasRole) {
      interaction.message.delete();
      staffChannel.send({ content: `<@${recruitId}> already has the recruit role!` });
    }


    await recruit.roles.add(recruitRoleId);
    staffChannel.send({ content: `<@${interaction.user.id}> has granted <@${recruitId}> the role of recruit.` });

  }
  catch (error) {
    console.log(error);
  }

};

const grantAmbassador = async (interaction, recruitId) => {

  const recruit = await interaction.guild.members.fetch(recruitId);

  const hasRole = recruit.roles.cache.has(ambassadorRoleId);

  const staffChannel = await interaction.guild.channels.fetch(staffChannelId);

  try {

    if (hasRole) {
      interaction.message.delete();
      staffChannel.send({ content: `<@${recruitId}> already has the ambassador role!` });
    }


    await recruit.roles.add(ambassadorRoleId);
    staffChannel.send({ content: `<@${interaction.user.id}> has granted <@${recruitId}> the role of ambassador.` });

  }
  catch (error) {
    console.log(error);
  }

};

const grantAttache = async (interaction, recruitId) => {

  const recruit = await interaction.guild.members.fetch(recruitId);

  const hasRole = recruit.roles.cache.has(attacheRoleId);

  const staffChannel = await interaction.guild.channels.fetch(staffChannelId);

  try {

    if (hasRole) {
      interaction.message.delete();
      staffChannel.send({ content: `<@${recruitId}> already has the attache role!` });
    }


    await recruit.roles.add(attacheRoleId);
    staffChannel.send({ content: `<@${interaction.user.id}> has granted <@${recruitId}> the role of attache.` });

  }
  catch (error) {
    console.log(error);
  }

};


module.exports = { recruitToStaff, ambassadorToStaff, attacheToStaff, beWithYouSoon, denied, grantRecruit, grantAmbassador, grantAttache };