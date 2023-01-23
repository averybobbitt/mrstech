const { SlashCommandBuilder } = require("@discordjs/builders");
const validateColor = require("validate-color").default;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("osu")
        .setDescription("generates a osu! signature banner")
        .addStringOption((option) => option.setName("player").setDescription("osu! username").setRequired(true))
        .addStringOption((option) => option.setName("color").setDescription("background color")),

    async execute(interaction) {
        const username = interaction.options.getString("player");
        var color = interaction.options.getString("color");

        if (color == null) color = "pink";

        if (validateColor(color)) {
            color = color.replace("#", "hex");
        }

        const img = `https://lemmmy.pw/osusig/sig.php?colour=${color}&uname=${username}&pp=0&removeavmargin&darktriangles&xpbar&xpbarhex`;

        await interaction.reply(img);
    },
};
