const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Replies with 'Pong!'",
    data: new SlashCommandBuilder(),
    async execute(interaction) {
        await interaction.reply("Pong!");
    },
};
