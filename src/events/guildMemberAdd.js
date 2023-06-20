const {
  Events,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const welcomeChannelId = "602225005165674511";

module.exports = {
  name: Events.GuildMemberAdd,
  once: false,
  async execute(newUser) {
    const userId = newUser.user.id;

    const newUserEmbed = new EmbedBuilder()
      .setTitle(`${newUser.user.username}, welcome to ECH Clan`)
      .setURL("https://www.echclan.net/")
      .setDescription(
        `Welcome to Echelon <@${userId}>, please select the appropriate option below and a staff member will be with you ASAP.`
      )
      .setColor("Green")
      .setTimestamp()
      .setThumbnail("https://www.echclan.net/img/ECHLogo.73a81d16.png")
      .addFields(
        { name: "Rule 1:", value: "Must be 18+" },
        {
          name: "Rule 2:",
          value:
            "Be willing to work in a team environment and respecting the chain of command",
        }
      )
      .addFields(
        {
          name: "Rule 3:",
          value:
            "Colonial players only, with no future intentions of playing Warden",
          inline: true,
        },
        {
          name: "Rule 4:",
          value:
            "Must not be part of another clan. Echelon does not permit double clanning amongst its members",
          inline: true,
        }
      )
      .setFooter({
        text: "Wardens go away",
        iconURL: "https://www.echclan.net/img/ECHLogo.73a81d16.png",
      });

    // Creates our action row of buttons
    const newUserActionRow = new ActionRowBuilder();
    newUserActionRow.components.push(
      new ButtonBuilder()
        .setCustomId(`recruitment-${userId}`)
        .setLabel("Regular Recruitment")
        .setStyle(ButtonStyle.Primary)
    );
    newUserActionRow.components.push(
      new ButtonBuilder()
        .setCustomId(`ambassador-${userId}`)
        .setLabel("Allied Ambassador Enlistment")
        .setStyle(ButtonStyle.Secondary)
    );
    newUserActionRow.components.push(
      new ButtonBuilder()
        .setCustomId(`attache-${userId}`)
        .setLabel("Allied Attache Enlistment")
        .setStyle(ButtonStyle.Success)
    );
    newUserActionRow.components.push(
      new ButtonBuilder()
        .setCustomId(`coaltionAttache-${userId}`)
        .setLabel("Coalition Attache Enlistment")
        .setStyle(ButtonStyle.Success)
    );

    await newUser.guild.channels
      .fetch(welcomeChannelId)
      .then((channel) => {
        channel.send({
          embeds: [newUserEmbed],
          components: [newUserActionRow],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
