const {
  Events,
  ActivityType,
  ChannelType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    client.user.setActivity({
      name: "Warden's Die",
      type: ActivityType.Watching,
    });

    const channelId = '1378185080522145874';
    const channel = await client.channels.fetch(channelId);
    if (!channel || channel.type !== ChannelType.GuildText) return;

    const embed = new EmbedBuilder()
      .setTitle('Join ECH Clan')
      .setDescription('Click the button below to fill out your application.')
      .setColor('Green')
      .setThumbnail('https://www.echclan.net/img/ECHLogo.73a81d16.png');

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('open_application_form')
        .setLabel('Apply to ECH')
        .setStyle(ButtonStyle.Primary)
    );

    // Fetch recent messages and check if embed already exists
    const messages = await channel.messages.fetch({ limit: 50 }); // Adjust limit as needed
    const alreadyExists = messages.some(msg => {
      const msgEmbed = msg.embeds[0];
      return (
        msg.embeds.length > 0 &&
        msgEmbed.title === embed.data.title &&
        msgEmbed.description === embed.data.description &&
        msgEmbed.thumbnail?.url === embed.data.thumbnail.url &&
        msgEmbed.color === embed.data.color
      );
    });

    if (!alreadyExists) {
      await channel.send({ embeds: [embed], components: [row] });
      await channel.send({
        content: `Due to Discord rate limiting, you may need to click this button multiple times. Give it a few attempts before reaching out to staff.`,
      });
      console.log(`✅ Application message sent to #${channel.name}`);
    } else {
      console.log(`ℹ️ Application message already exists in #${channel.name}`);
    }
  },
};
