/* eslint-disable no-case-declarations */
const { Events } = require("discord.js");
const {
  recruitToStaff,
  ambassadorToStaff,
  attacheToStaff,
  ncapAttacheToStaff,
  beWithYouSoon,
  denied,
  grantRecruit,
  grantAmbassador,
  grantAttache,
  grantNCAPAttache,
} = require("../btns/btnMethods.js");
const { handleSelectChoice } = require("../roleSelectMenu/roleSelectMenu");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    // We don't want any PM functionality so just a quick check that this is happening in the server
    if (!interaction.inGuild()) return;

    if (interaction.isStringSelectMenu()) {
      try {
        handleSelectChoice(interaction);
      } catch (err) {
        console.log(err);
      }
      return;
    }

    // Button handling
    if (interaction.isButton()) {
      try {
        // reply loader
        await interaction.deferReply({ ephemeral: true });
        // this is a little retarded but we're bouncing embeds instead of using proper slash commands so I'll try to be clean
        const userBtnPrefix = ["recruitment", "ambassador", "attache"];

        // customids are set to the button as [buttonlabel]-[assigneduserid], we split them to handle which button is called and prevent other users from touching btns
        const splitArr = interaction.customId.split("-");
        const btnType = splitArr[0];
        const authUserId = splitArr[1];
        const interactorId = interaction.user.id;

        // Compares the original user id from customID with whoever interacts with it, if they don't match we end method.
        // This is to prevent other users from messing with buttons not intended for them.
        // the includes is to only run this check on user interactable buttons and not staff ones
        if (interactorId !== authUserId && userBtnPrefix.includes(btnType)) {
          interaction.editReply({ content: "That doesn't belong to you!" });
          return;
        }

        switch (btnType) {
          case "recruitment":
            recruitToStaff(interaction);
            interaction.editReply({
              content: `<@${authUserId}>, a recruiter has been notified. We will get back to you shortly.`,
            });
            // If I don't make this delete someone will spam the fuck out of you
            interaction.message.delete();
            break;
          case "ambassador":
            ambassadorToStaff(interaction);
            interaction.editReply({
              content: `<@${authUserId}>, a staff member has been notified. We will get back to you shortly.`,
            });
            // If I don't make this delete someone will spam the fuck out of you
            interaction.message.delete();
            break;
          case "attache":
            attacheToStaff(interaction);
            interaction.editReply({
              content: `<@${authUserId}>, a staff member has been notified. We will get back to you shortly.`,
            });
            // If I don't make this delete someone will spam the fuck out of you
            interaction.message.delete();
            break;
          case "coalitionAttache":
            ncapAttacheToStaff(interaction);
            interaction.editReply({
              content: `<@${authUserId}>, a staff member has been notified. We will get back to you shortly.`,
            });
            // If I don't make this delete someone will spam the fuck out of you
            interaction.message.delete();
            break;
          case "delay":
            beWithYouSoon(interaction, authUserId);
            interaction.editReply({
              content: `<@${authUserId}> has been notified.`,
            });
            break;
          case "deny":
            denied(interaction, authUserId);
            interaction.editReply({
              content: `<@${authUserId}>'s application has been denied.`,
            });
            break;
          case "grantRecruit":
            grantRecruit(interaction, authUserId);
            interaction.editReply({
              content: `<@${authUserId}> has been granted the role of recruit.`,
            });
            // If I don't make this delete someone will spam the fuck out of you
            interaction.message.delete();
            break;
          case "grantAmbassador":
            grantAmbassador(interaction, authUserId);
            interaction.editReply({
              content: `<@${authUserId}> has been granted the role of ambassador.`,
            });
            // If I don't make this delete someone will spam the fuck out of you
            interaction.message.delete();
            break;
          case "grantAttache":
            grantAttache(interaction, authUserId);
            interaction.editReply({
              content: `<@${authUserId}> has been granted the role of attache.`,
            });
            // If I don't make this delete someone will spam the fuck out of you
            interaction.message.delete();
            break;
          case "grantNCAPAttache":
            grantNCAPAttache(interaction, authUserId);
            interaction.editReply({
              content: `<@${authUserId}> has been granted the role of coalition attache.`,
            });
            // If I don't make this delete someone will spam the fuck out of you
            interaction.message.delete();
            break;
          case "changeChannelName":
            const channel = await interaction.guild.channels.fetch(authUserId);

            // We are getting absolutely retarded in here
            interaction.editReply({
              content:
                "Please respond in the channel with the format: !name your channel name here.",
            });

            var filter = (m) => m.content.includes("!name");

            var collector = channel.createMessageCollector({
              filter,
              max: 1,
              time: 15000,
            });

            collector.on("collect", (m) => {
              const split = m.content.split("!name");

              channel.setName(split[1].trim());
              channel.send(`Channel name set to ${split[1].trim()}`);
            });

            break;
          case "changeUserLimit":
            const limitChannel = await interaction.guild.channels.fetch(
              authUserId
            );

            // We are getting absolutely retarded in here
            interaction.editReply({
              content:
                "Please respond in the channel with the format: !limit yourNumHere.",
            });

            var filter = (m) => m.content.includes("!limit");

            var collector = limitChannel.createMessageCollector({
              filter,
              max: 1,
              time: 15000,
            });

            collector.on("collect", (m) => {
              const split = m.content.split(" ");
              if (split[1] > 99) {
                split[1] = 99;
              }
              limitChannel.edit({ userLimit: split[1] });
              limitChannel.send(`User limit set to ${split[1]}`);
            });

            break;
          default:
            interaction.editReply({
              content: "Error, something has gone wrong.",
            });
        }
      } catch (err) {
        console.log(err);
      }
    }

    // //////////////////////////// Chat command handling below

    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    // Chat commands
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
