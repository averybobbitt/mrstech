const { ApplicationCommandType } = require('discord.js')

const name = 'ping'
const desc = "Replies with 'Pong!'"

module.exports = {
    name: name,
    description: desc,
    type: ApplicationCommandType.ChatInput,
    async execute(interaction) {
        await interaction.reply('Pong!')
    },
}
