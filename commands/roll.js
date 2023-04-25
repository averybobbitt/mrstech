const {
    ApplicationCommandType,
    ApplicationCommandOptionType,
} = require('discord.js')

const name = 'roll'
const desc = 'rolls a die (essentially a random number generator)'

module.exports = {
    name: name,
    description: desc,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'args',
            description: 'number of sides of the die',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
    async execute(interaction) {
        roll = Math.floor(
            Math.random() * interaction.options.getInteger('args') + 1
        )
        await interaction.reply(`You rolled: **${roll}**`)
    },
}
