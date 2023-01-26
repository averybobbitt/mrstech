const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "roll",
    description: "rolls a die (essentially a random number generator)",
    data: new SlashCommandBuilder().addIntegerOption((option) =>
        option.setName("args").setDescription("number of sides of the die").setRequired(true)
    ),
    async execute(interaction) {
        roll = Math.floor(Math.random() * interaction.options.getInteger("args") + 1);
        await interaction.reply(`You rolled: **${roll}**`);
    },
};
