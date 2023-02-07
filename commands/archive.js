const { ApplicationCommandType } = require("discord.js");

const name = "archive";
const desc = "Archives current text channel";

module.exports = {
    name: name,
    description: desc,
    type: ApplicationCommandType.ChatInput,
    async execute(interaction) {
        const archive = interaction.guild.channels.cache.find((c) => c.id == process.env.ARCHIVE_ID);

        if (!archive) console.error("Archive category channel not found!");

        interaction.channel.setParent(archive);
        interaction.guild.systemChannel.send(`${interaction.user} archived ${interaction.channel}`);

        await interaction.reply({
            content: "Successfully archived channel.",
            ephemeral: true,
        });
    },
};
