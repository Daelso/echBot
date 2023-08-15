const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputStyle,
  SlashCommandBuilder,
  TextInputBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("medalrequest")
    .setDescription("Request a medal!"),
  async execute(interaction) {
    const staffChannel = "801198904213110825";

    //modal building xD
    const modal = new ModalBuilder({
      customId: `medalModal-${interaction.user.id}`,
      title: "Medal Request",
    });
    const medal = new TextInputBuilder({
      customId: "medalInput",
      label: "Medal Requested:",
      style: TextInputStyle.Short,
    });

    const reason = new TextInputBuilder({
      customId: "reasonInput",
      label: "Reasons for Medal:",
      style: TextInputStyle.Paragraph,
    });

    //adding the rows
    const firstRow = new ActionRowBuilder().addComponents(medal);
    const secondRow = new ActionRowBuilder().addComponents(reason);

    modal.addComponents(firstRow, secondRow);

    //showing modal, waiting for input
    await interaction.showModal(modal);

    const filter = (interaction) =>
      interaction.customId === `promotionModal-${interaction.user.id}`;

    interaction
      .awaitModalSubmit({ filter, time: 180_000 })
      .then((modalInteraction) => {
        const medalValue =
          modalInteraction.fields.getTextInputValue("medalInput");

        const reasonValue =
          modalInteraction.fields.getTextInputValue("reasonInput");

        modalInteraction.reply({
          content:
            "Your medal request has been submitted, an Officer will follow up with you.",
          ephemeral: true,
        });

        //Sends nice lil embed to staff.
        const medalRequestEmbed = new EmbedBuilder()
          .setTitle("New Medal Request!")
          .setURL("https://www.echclan.net/")
          .setDescription(
            `<@${interaction.user.id}> has submitted a new medal request.`
          )
          .setColor("Green")
          .setTimestamp()
          .setThumbnail("https://www.echclan.net/img/ECHLogo.73a81d16.png")
          .addFields(
            { name: "Medal Requested", value: `${medalValue}` },
            {
              name: "Reason for Medal",
              value: `${reasonValue}`,
            }
          )

          .setFooter({
            text: "Wardens go away",
            iconURL: "https://www.echclan.net/img/ECHLogo.73a81d16.png",
          });

        //gets our staff channel, sends our embed
        interaction.guild.channels.cache.get(staffChannel).send({
          embeds: [medalRequestEmbed],
        });
      })
      .catch((err) => {
        //hopefully doesn't happen
        console.log(err);
      });
  },
};
