const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");
const validateColor = require("validate-color").default;
const req = require("requests");

const name = "osu";
const desc = "generates a osu! signature banner";

module.exports = {
    name: name,
    description: desc,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "player",
            description: "osu! username",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "color",
            description: "banner color (also accepts hex)",
            type: ApplicationCommandOptionType.String,
        },
    ],
    async execute(interaction) {
        const username = interaction.options.getString("player");
        var color = interaction.options.getString("color");

        if (color == null) color = "pink";

        if (validateColor(color)) {
            color = color.replace("#", "hex");
        }

        await interaction.reply(
            `https://lemmmy.pw/osusig/sig.php?colour=${color}&uname=${username}&pp=0&removeavmargin&darktriangles&xpbar&xpbarhex`
        );
    },
};
