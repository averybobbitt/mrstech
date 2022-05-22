const { SlashCommandBuilder } = require("@discordjs/builders");
const { Options } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("rolls a die (essentially a random number generator)")
    .addIntegerOption((option) =>
      option
        .setName("args")
        .setDescription("number of sides of the die")
        .setRequired(true)
    ),
  async execute(interaction) {
    roll = Math.floor(
      Math.random() * interaction.options.getInteger("args") + 1
    );
    await interaction.reply(`You rolled: **${roll}**`);
  },
};
