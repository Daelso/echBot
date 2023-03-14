const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('askai')
    .setDescription('Ask OpenAI a question.'),
  async execute(interaction) {
    if (interaction.user.bot) return;
    try {

      const question = interaction.options.get('question').value;
      const convoLog = [{ role: 'system', content: 'You are an experienced veteran of the video game Foxhole. You are a member of the Colonials faction.' }];

      convoLog.push({ role:'user', content: question });

      await interaction.deferReply({ ephemeral: false });

      const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: convoLog,
      });

      const ballEmbed = new EmbedBuilder().setTitle(`🎖️ ${question}`).setDescription(`${result.data.choices[0].message.content}`).setColor('Random').addFields({ name: 'Asked By:', value: `${interaction.member.user.username}` }).setTimestamp()
        .setThumbnail('https://www.echclan.net/img/ECHLogo.73a81d16.png').setAuthor({ name: 'ECHMAN', iconURL: 'https://i.imgur.com/feosDwh.png', url: 'https://www.echclan.net' });

      interaction.editReply({ embeds: [ballEmbed] });
    }
    catch (error) {
      console.log(error);
      interaction.editReply({ content: 'We are out of AI tokens, make Connor buy more.' });
    }


  },
};