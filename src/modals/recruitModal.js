const {
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

const { recruitToStaff } = require("../btns/btnMethods.js");

const staffChannelId = "887391851244576768";

const question1 = "Are you 18+?";
const question2 = "Do you have any areas of interest in Foxhole?";
const question3 = "What is your primary timezone?";
const question4 = "Do you have any extra skills you can offer?";
const question5 = "What's your skill level in Foxhole?";

const recruitModal = async (interaction) => {
  const modal = new ModalBuilder()
    .setCustomId(`recruitment-${interaction.user.id}`)
    .setTitle("Recruit Questionnaire");

  // Add components to modal

  // Create the text input components
  const ageInput = new TextInputBuilder()
    .setCustomId("ageInput")
    // The label is the prompt the user sees for this input
    .setLabel(question1)
    // Short means only a single line of text
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("Yes/No")
    .setRequired(true);

  const interestInput = new TextInputBuilder()
    .setCustomId("interestInput")
    .setLabel(question2)
    // Paragraph means multiple lines of text.
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder("Logistics, tanks, partisans, etc")
    .setRequired(true);

  const timezoneInput = new TextInputBuilder()
    .setCustomId("timezoneInput")
    // The label is the prompt the user sees for this input
    .setLabel(question3)
    // Short means only a single line of text
    .setStyle(TextInputStyle.Short)
    .setPlaceholder("NA/EU")
    .setRequired(true);

  const skillsInput = new TextInputBuilder()
    .setCustomId("skillsInput")
    .setLabel(question4)
    // Paragraph means multiple lines of text.
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder("Artwork, music, videos, etc")
    .setRequired(true);

  const levelInput = new TextInputBuilder()
    .setCustomId("levelInput")
    .setLabel(question5)
    // Paragraph means multiple lines of text.
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder("We welcome all levels")
    .setRequired(true);

  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow = new ActionRowBuilder().addComponents(ageInput);
  const secondActionRow = new ActionRowBuilder().addComponents(interestInput);
  const thirdActionRow = new ActionRowBuilder().addComponents(timezoneInput);
  const fourthActionRow = new ActionRowBuilder().addComponents(skillsInput);
  const fifthActionRow = new ActionRowBuilder().addComponents(levelInput);

  // Add inputs to the modal
  modal.addComponents(
    firstActionRow,
    secondActionRow,
    thirdActionRow,
    fourthActionRow,
    fifthActionRow
  );

  // Show the modal to the user
  await interaction.showModal(modal);

  const filter = (interaction) =>
    interaction.customId === `recruitment-${interaction.user.id}`;

  //retrieve modal response
  interaction
    .awaitModalSubmit({ filter, time: 120000 })
    .then(async (modalResponse) => {
      const ageAnswer =
        `${question1}: ` + modalResponse.fields.getTextInputValue("ageInput");
      const interestAnswer =
        `${question2}: ` +
        modalResponse.fields.getTextInputValue("interestInput");
      const tzAnswer =
        `${question3}: ` +
        modalResponse.fields.getTextInputValue("timezoneInput");
      const skillsAnswer =
        `${question4}: ` +
        modalResponse.fields.getTextInputValue("skillsInput");
      const levelAnswer =
        `${question5}: ` + modalResponse.fields.getTextInputValue("levelInput");

      const answersObj = {
        ageAnswer,
        interestAnswer,
        tzAnswer,
        skillsAnswer,
        levelAnswer,
      };

      await interaction.guild.channels
        .fetch(staffChannelId)
        .then((channel) => {
          channel.send("Questionnaire Answers:");

          for (const answer in answersObj) {
            channel.send(answersObj[answer]);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      modalResponse.reply(
        `<@${interaction.user.id}>, a recruiter has been notified. We will get back to you shortly.`
      );
      await interaction.message.delete();
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  recruitModal,
};
