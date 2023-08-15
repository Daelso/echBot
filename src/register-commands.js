/* eslint-disable no-undef */
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");
// eslint-disable-next-line no-undef
require("dotenv").config();

const commands = [
  {
    name: "8ball",
    description: "Returns a magic 8 ball response to your question.",
    options: [
      {
        name: "question",
        description: "Your question?",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "remindme",
    description:
      "Will ping you after a set amount of time with a reminder. Format: 3h (3 hours), 20m (20 min)",
  },
  {
    name: "purge",
    description: "Removes active member roles from those switching to Warden.",
  },
  {
    name: "getroles",
    description: "Allows the user to set their optional discord roles.",
  },
  {
    name: "askai",
    description: "Ask OpenAI a question.",
    options: [
      {
        name: "question",
        description: "Your question?",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "promotionrequest",
    description: "Request a promotion!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Registering commands");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Commands registered");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
})();
