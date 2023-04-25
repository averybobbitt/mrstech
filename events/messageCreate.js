const { Events, EmbedBuilder } = require('discord.js')

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (
            !message.content.match(
                /https?:\/\/(www\.)?tiktok\.com\/t\/[a-zA-Z0-9]{9}\/?/gi
            )
        )
            return

        const url = message.content
        const src = message.channel
        const dest = await message.guild.channels.fetch(process.env.TIKTOKS)
        const response = await fetch(url)

        if (!dest) {
            console.error(
                `No channel with ID (${process.env.TIKTOKS}) was found.`
            )
            return
        }

        // remove message from where it was sent
        await src.messages.delete(message)

        // send message in tiktok channel
        const tiktok = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle('TikTok')
            .setURL(url)
            .setAuthor({
                name: message.author.username,
                iconURL: message.author.avatarURL(),
            })
            .setImage(url)
            .setTimestamp()

        src.send({
            embeds: [
                {
                    title: 'TikTok',
                    color: 0xff0000,
                    url: url,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.avatarURL(),
                    },
                    timestamp: new Date(),
                },
            ],
        })
    },
}
