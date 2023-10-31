const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getroles")
    .setDescription("Allows the user to set their optional discord roles."),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("Nothing selected")
        .setMinValues(1)
        .addOptions(
          {
            label: "🔨 Logistics Trooper",
            description:
              "Responsible for the creation and transportation of materials.",
            value: "803841344341671937",
          },
          {
            label: "🇪🇺 EUCOM",
            description: "Shows that you play in the EU timezone.",
            value: "894289507254403073",
          },
          {
            label: "🔫 Rifleman",
            description:
              "You have a special interest in operation as a standard infantryman.",
            value: "910273567495700521",
          },
          {
            label: "✚ Medic",
            description: "Responsible for saving downed Echelon Troopers",
            value: "913867373101080616",
          },
          {
            label: "🛠️ Combat Engineer",
            description:
              "Responsible for building FOBs and defensive positions.",
            value: "913867033387618424",
          },
          {
            label: "🏘️ Construction Engineer",
            description: "Responsible for shoring up Colonial backlines.",
            value: "913870040946855966",
          },
          {
            label: "💥 Artilleryman",
            description:
              "Artillerymen show a degree of proficiency and interest in bombardments.",
            value: "911673029778624573",
          },
          {
            label: "🛡️ Armoured Crewman",
            description:
              "Armour specialists, select this if you like stealing tanks.",
            value: "913867100848808008",
          },
          {
            label: "🚢 Naval Trooper",
            description:
              "You can take a sailor out of the navy but you'll never get the seaman out of him.",
            value: "1167972397220114453",
          },
          {
            label: "📦 Facility Trooper",
            description: "Something need doing?",
            value: "1121962314145476648",
          },
          {
            label: "🚔 QRF",
            description:
              "Ready to rapidly respond to Warden threats anywhere, anytime.",
            value: "941498858695983165",
          },
          {
            label: "👾 Game Night Trooper",
            description: "I want to game with the guys.",
            value: "958159416002228264",
          },
          {
            label: "💤 Inactive",
            description: "I don't plan on playing in this war.",
            value: "986278265054449764",
          },
          {
            label: "🥱 Low Commitment",
            description: "I'll be playing a few hours a week at most",
            value: "986301424763813908",
          },
          {
            label: "🕛 Active",
            description: "I'll be playing consistantly this war.",
            value: "986278261510258728",
          },
          {
            label: "🧂 Vanguard",
            description: "I will be no-lifing this war.",
            value: "986278253754998794",
          }
        )
    );

    const embed = new EmbedBuilder()
      .setTitle("Please add or remove your optional roles")
      .setURL("https://www.echclan.net/")
      .setDescription(
        "Welcome to the Role Selection System. PLEASE NOTE THAT ALL TABS ARE NOT PRESENT, as certain tabs are restricted behind qualifications. As such, speciality tabs must be manually assigned by an administrator. To select a tab, simply choose the option below. If you make a mistake or are no longer interested in that tab, simply select that option again and the bot will remove it for you. Please try to only select what you are interested in and like to perform, as this function helps clan leadership see what people are interested in."
      )
      .setColor("Green")
      .setTimestamp()
      .setThumbnail("https://www.echclan.net/img/ECHLogo.73a81d16.png")
      .addFields(
        {
          name: "🔨 Logistics Trooper",
          value:
            "Responsible for the creation and transportation of material for Echelon operations.",
          inline: true,
        },
        {
          name: "🇪🇺 EUCOM",
          value:
            "Shows that you play in the EU timezone. EUCOM will receive special pings for operations in their timezone.",
          inline: true,
        },
        {
          name: "🔫 Rifleman",
          value:
            "While all Echelon Personnel are expected to show some proficiency with a rifle, this tab shows that you have a special interest in operation as a standard infantryman.",
          inline: true,
        }
      )
      .addFields(
        {
          name: "✚ Medic",
          value:
            "Responsible for saving downed Echelon Troopers and other Colonial personnel during operations, the Echelon Medic is a key component in frontline operations. Feel free to add the ✚ symbol in your Discord name.",
          inline: true,
        },
        {
          name: "🛠️ Combat Engineer",
          value:
            "Combat Engineers are tasked with creating forward operation positions, and creating defensive areas during Echelon operations.",
          inline: true,
        },
        {
          name: "🏘️ Construction Engineer",
          value:
            "While not always necessarily in the middle of the action, Construction Engineers are vital in building up the Colonial backlines in the unfortunate event of a Warden counterattack.",
          inline: true,
        }
      )
      .addFields(
        {
          name: "💥 Artilleryman",
          value:
            "Echelon artillery operations are noted for their complexity. As such, Artillerymen show a degree of proficiency and interest in the process of conducting successful bombardment against the enemy.",
          inline: true,
        },
        {
          name: "🛡️ Armoured Crewman",
          value:
            "Armoured Crewmen show both interest and a degree of skill in armoured operations in the different positions in armoured vehicles. Troopers with this tab are expected to do their best to listen to senior armoured crewmen, as armoured operations are costly on the logistics side of operations",
          inline: true,
        },
        {
          name: "🏘️ Construction Engineer",
          value:
            "QRF, or Quick Reaction Force, is used to quickly react to Warden threats throughout the map utilizing various means, from simple infantry responses to utilizing artillery. By signing up for this role, you will receive pings if a threat is detected.",
          inline: true,
        },
        {
          name: "🚢 Naval Trooper",
          value: "I want to take part in Naval operations, AKA I love Seamen.",
          inline: true,
        },
        {
          name: "📦 Facility Trooper",
          value: "For troopers who work on backline facilities",
          inline: true,
        },
        {
          name: "👾 Game Night Trooper",
          value:
            "Take this role if you would like to be notified of Echelon game nights that do not involve Foxhole. These games can range from Among Us, to heavily modded ARMA 3 games.",
          inline: true,
        }
      )
      .addFields({
        name: "ECHELON ACTIVITY LEVELS",
        value:
          "All roles below this point are for how active you intend to be in this war.",
      })
      .addFields(
        {
          name: "💤 Inactive",
          value:
            "The Inactive activity level signifies that you do not plan on participating for the present/upcoming war.",
        },
        {
          name: "🥱 Low Commitment",
          value:
            "The Low Commitment activity level shows that you plan on somewhat participating for the present/upcoming war, but do not plan on being super committed. A rough estimate of the hours for this role would be ~5 or less hours per week.",
          inline: true,
        },
        {
          name: "🕛 Active",
          value:
            "The Active activity level represents that you plan on being fairly active for the upcoming war. Take this role if you plan on playing consistently.",
          inline: true,
        },
        {
          name: "🧂 Vanguard",
          value:
            "The Vanguard activity level is for those ECH troopers that are either incredibly committed players, or for those wanting a more serious experience. By choosing this role, you gain access to the Saltbox section of Echelon, where members can gather for a more serious experience together. Do not join these chats just to joke around and hang out, as doing so will result in the Vangaurd role being taken away from the offending Echelon Personnel. While there are no guidelines in terms of hours played for this activity level, it is designed for those that play very consistently and for those who want a more serious atmosphere.",
        }
      )
      .setFooter({
        text: "The Evan Project",
        iconURL: "https://www.echclan.net/img/ECHLogo.73a81d16.png",
      });

    await interaction.reply({
      ephemeral: true,
      components: [row],
      embeds: [embed],
    });
  },
};
