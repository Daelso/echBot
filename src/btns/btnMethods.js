const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

// This file handles individual button functions, just keeping stuff clean, there will be some repetition please forgive me coding gods

// Our various role ids below

// channels
const staffChannelId = '887391851244576768';

const welcomeChannelId = '602225005165674511';

const genChatId = '1080532236048285716';

// Role ids
const recruiterRoleId = '808801568563527731';


const recruitRoleId1 = '799068165375262740';

const recruitRoleId2 = '769254283639914506';

const ambassadorRoleId = '769253575850328084';

const attacheRoleId = '769253326797144104';

const ncapAttache = '1079854660153778267';


const recruitToStaff = async (interaction) => {

  const staffActionRow = new ActionRowBuilder();

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
    }).catch(err => {
      console.log(err);
    });

};


const ambassadorToStaff = async (interaction) => {

  const recruitId = interaction.user.id;

  const staffActionRow = new ActionRowBuilder();
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
    }).catch(err => {
      console.log(err);
    });

};

const attacheToStaff = async (interaction) => {

  const recruitId = interaction.user.id;

  const staffActionRow = new ActionRowBuilder();
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
    }).catch(err => {
      console.log(err);
    });

};

const ncapAttacheToStaff = async (interaction) => {

  const recruitId = interaction.user.id;

  const staffActionRow = new ActionRowBuilder();
  const recruitEmbed = new EmbedBuilder().setTitle('A coalition attache needs assistance!')
    .setDescription(`<@${recruitId}> is looking to receive the coalition attache role, please select an option below.`)
    .setColor('Random')
    .setTimestamp()
    .setThumbnail('https://www.echclan.net/img/ECHLogo.73a81d16.png')
    .setImage(interaction.user.displayAvatarURL({ dynamic:true, size:512 }));

  staffActionRow.components.push(new ButtonBuilder().setCustomId(`grantNCAPAttache-${recruitId}`).setLabel('Grant Coalition Attache Role').setStyle(ButtonStyle.Primary));
  staffActionRow.components.push(new ButtonBuilder().setCustomId(`delay-${recruitId}`).setLabel('Be With Them Shortly').setStyle(ButtonStyle.Secondary));
  staffActionRow.components.push(new ButtonBuilder().setCustomId(`deny-${recruitId}`).setLabel('Deny').setStyle(ButtonStyle.Danger));


  await interaction.guild.channels.fetch(staffChannelId)
    .then(channel => {
      channel.send({ content: `<@&${recruiterRoleId}>` });
      channel.send({ embeds: [recruitEmbed], components: [staffActionRow] });
    }).catch(err => {
      console.log(err);
    });

};

const beWithYouSoon = async (interaction, recruitId) => {

  await interaction.guild.channels.fetch(welcomeChannelId)
    .then(channel => {
      channel.send({ content: `<@${recruitId}>, <@${interaction.user.id}> has seen your application and will be in touch with you shortly!` });
    }).catch(err => {
      console.log(err);
    });


};

const denied = async (interaction, recruitId) => {


  // Sends our message to recruit and logs the interaction in staff channel, then deletes our embed to prevent spam
  await interaction.guild.channels.fetch(welcomeChannelId)
    .then(channel => {
      channel.send({ content: `<@${recruitId}>, <@${interaction.user.id}> has DENIED your application. Thank you for applying.` });
    }).catch(err => {
      console.log(err);
    });

  await interaction.guild.channels.fetch(staffChannelId)
    .then(channel => {
      channel.send({ content: `<@${interaction.user.id}> has DENIED <@${recruitId}>'s application.` });
    }).catch(err => {
      console.log(err);
    });

  // Deletes and closes the interaction
  interaction.message.delete();

};


// Below are strictly role granting interactions

const grantRecruit = async (interaction, recruitId) => {

  const recruit = await interaction.guild.members.fetch(recruitId);

  const hasRole = recruit.roles.cache.has(recruitRoleId1);

  const staffChannel = await interaction.guild.channels.fetch(staffChannelId);

  const generalChannel = await interaction.guild.channels.fetch(genChatId);

  try {

    if (hasRole) {
      interaction.message.delete();
      staffChannel.send({ content: `<@${recruitId}> already has the recruit role!` });
    }


    await recruit.roles.add(recruitRoleId1);
    await recruit.roles.add(recruitRoleId2);
    staffChannel.send({ content: `<@${interaction.user.id}> has granted <@${recruitId}> the role of recruit.` });
    generalChannel.send({ content: `Hey <@${recruitId}>, Welcome to Echelon! You have been granted junior clan roles for the time being. Upon attending one official operation, you will be granted full Discord access. If you have any questions, please feel free to ask. Also be sure to add [ECH] tags to your Discord name!` });

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

const grantNCAPAttache = async (interaction, recruitId) => {

  const recruit = await interaction.guild.members.fetch(recruitId);

  const hasRole = recruit.roles.cache.has(ncapAttache);

  const staffChannel = await interaction.guild.channels.fetch(staffChannelId);

  try {

    if (hasRole) {
      interaction.message.delete();
      staffChannel.send({ content: `<@${recruitId}> already has the attache role!` });
    }


    await recruit.roles.add(ncapAttache);
    staffChannel.send({ content: `<@${interaction.user.id}> has granted <@${recruitId}> the role of attache.` });

  }
  catch (error) {
    console.log(error);
  }

};

module.exports = { recruitToStaff, ambassadorToStaff, attacheToStaff, ncapAttacheToStaff, beWithYouSoon, denied, grantRecruit, grantAmbassador, grantAttache, grantNCAPAttache };