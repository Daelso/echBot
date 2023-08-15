const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputStyle,
  SlashCommandBuilder,
  TextInputBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("promotionrequest")
    .setDescription("Request a promotion!"),
  async execute(interaction) {
    const staffChannel = "801198904213110825";

    //modal building xD
    const modal = new ModalBuilder({
      customId: `promotionModal-${interaction.user.id}`,
      title: "Promotion Request",
    });

    const currentRank = new TextInputBuilder({
      customId: "currentRankInput",
      label: "What is your current rank?",
      style: TextInputStyle.Short,
    });

    const requestedRank = new TextInputBuilder({
      customId: "requestedRankInput",
      label: "What is your requested rank?",
      style: TextInputStyle.Short,
    });

    const timeSinceLast = new TextInputBuilder({
      customId: "sinceLastInput",
      label: "Time Since Last Promotion (Roughly):",
      style: TextInputStyle.Short,
    });

    const reason = new TextInputBuilder({
      customId: "reasonInput",
      label: "Reasons for Promotion:",
      style: TextInputStyle.Paragraph,
    });

    //adding the rows
    const firstRow = new ActionRowBuilder().addComponents(currentRank);
    const secondRow = new ActionRowBuilder().addComponents(requestedRank);
    const thirdRow = new ActionRowBuilder().addComponents(timeSinceLast);
    const fourthRow = new ActionRowBuilder().addComponents(reason);

    modal.addComponents(firstRow, secondRow, thirdRow, fourthRow);

    //showing modal, waiting for input
    await interaction.showModal(modal);

    const filter = (interaction) =>
      interaction.customId === `promotionModal-${interaction.user.id}`;

    interaction
      .awaitModalSubmit({ filter, time: 180_000 })
      .then((modalInteraction) => {
        const currentRankValue =
          modalInteraction.fields.getTextInputValue("currentRankInput");
        const requestedRankValue =
          modalInteraction.fields.getTextInputValue("requestedRankInput");
        const sinceLastValue =
          modalInteraction.fields.getTextInputValue("sinceLastInput");
        const reasonValue =
          modalInteraction.fields.getTextInputValue("reasonInput");

        modalInteraction.reply({
          content:
            "Your promotion request has been submitted, an Officer will follow up with you.",
          ephemeral: true,
        });

        //Sends nice lil embed to staff.
        const promotionRequestEmbed = new EmbedBuilder()
          .setTitle("New Promotion Request!")
          .setURL("https://www.echclan.net/")
          .setDescription(
            `<@${interaction.user.id}> has submitted a new promotion request.`
          )
          .setColor("Green")
          .setTimestamp()
          .setThumbnail("https://www.echclan.net/img/ECHLogo.73a81d16.png")
          .addFields(
            { name: "Current Rank", value: `${currentRankValue}` },
            {
              name: "Requested Rank",
              value: `${requestedRankValue}`,
            }
          )
          .addFields(
            {
              name: "Time Since Last Promotion (Roughly)",
              value: `${sinceLastValue}`,
            },
            {
              name: "Reason for Promotion",
              value: `${reasonValue}`,
            }
          )
          .setFooter({
            text: "Wardens go away",
            iconURL: "https://www.echclan.net/img/ECHLogo.73a81d16.png",
          });

        //gets our staff channel, sends our embed
        interaction.guild.channels.cache.get(staffChannel).send({
          embeds: [promotionRequestEmbed],
        });
      })
      .catch((err) => {
        //hopefully doesn't happen
        console.log(err);
      });
  },
};
