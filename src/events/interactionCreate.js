/* eslint-disable no-case-declarations */
const { Events,   ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder } = require("discord.js");

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
const { v4: uuidv4 } = require('uuid');
const { handleSelectChoice } = require("../roleSelectMenu/roleSelectMenu");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    // We don't want any PM functionality so just a quick check that this is happening in the server
    if (!interaction.inGuild()) return;

    // Button handling
    if (interaction.isButton()) {
      try {
                const splitArr = interaction.customId.split("-");
        const btnType = splitArr[0];

        console.log(interaction.customId)
              if (btnType === "open_application_form") {
        const authUserId = interaction.user.id;
        const uuid = uuidv4()
        console.log(uuid)

        const modal = new ModalBuilder()
          .setCustomId(`applicationForm-${authUserId}-${uuid}`)
          .setTitle("ECH Clan Application");

        modal.addComponents(
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("inGameName")
              .setLabel("In-game name")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("stayColonial")
              .setLabel("Will you stay Colonial?")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("readRules")
              .setLabel("Have you read our rules?")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("gameAreas")
              .setLabel("What areas of the game do you prefer?")
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("questionsComments")
              .setLabel("Other questions or comments?")
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(false)
          )
        );

try {
  await interaction.showModal(modal);

  const filter = (i) => 
    i.customId === `applicationForm-${authUserId}-${uuid}` &&
    i.user.id === authUserId;

  interaction
    .awaitModalSubmit({ filter, time: 15_000 }) // up to 60s is a safe default
    .then((modalInteraction) => {
      console.log(`${modalInteraction.customId} was submitted!`);
              const nameValue =
          modalInteraction.fields.getTextInputValue("inGameName");

        const colonialValue =
          modalInteraction.fields.getTextInputValue("stayColonial");

          
        const readRulesValue =
          modalInteraction.fields.getTextInputValue("readRules");

       const gameAreasValue =
          modalInteraction.fields.getTextInputValue("gameAreas");
             const questionsValue =
          modalInteraction.fields.getTextInputValue("questionsComments");

          console.log(nameValue)
          console.log(colonialValue)
          console.log(readRulesValue)
          console.log(gameAreasValue)
          console.log(questionsValue)

          const answers_obj = {
            ign: nameValue,
            colonial: colonialValue,
            readRules:readRulesValue,
            gameAreas: gameAreasValue,
            questions: questionsValue
          }
      modalInteraction.reply({
        content: "Thanks for your application, an officer will reach out to you ASAP!",
        ephemeral: true,
      });

 recruitToStaff(interaction, answers_obj)
      return;
    })
    .catch((err) => {
      // This happens when the modal times out or is dismissed
      if (err.code === 'INTERACTION_COLLECTOR_ERROR' || err instanceof Error) {
        console.log("Modal was cancelled or timed out.");
        // No need to reply or do anything here
        return;
      } else {
        console.error("Unexpected modal error:", err);
        return;
      }
    });

} catch (err) {
  console.error("Failed to show modal:", err);
        await interaction.reply('Done!')
        return;

}
      return;
    }


    
      await interaction.deferReply({ ephemeral: true });
  

        // this is a little retarded but we're bouncing embeds instead of using proper slash commands so I'll try to be clean
        const userBtnPrefix = ["recruitment", "ambassador", "attache"];

        // customids are set to the button as [buttonlabel]-[assigneduserid], we split them to handle which button is called and prevent other users from touching btns

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
              content: "Error, something has gone wrong, please try again",
            });
           break;
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
