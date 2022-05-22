const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
const validateColor = require("validate-color").default;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("osu")
    .setDescription("generates a osu! signature banner")
    .addStringOption((option) => option.setName("player").setDescription("osu! username").setRequired(true))
    .addStringOption((option) => option.setName("color").setDescription("background color")),

  async execute(interaction) {
    var color = interaction.options.getString("color");;
    const username = interaction.options.getString("player");
    const imgURL = `https://lemmmy.pw/osusig/sig.php?colour=${color}&uname=${username}&pp=0&removeavmargin&darktriangles&xpbar&xpbarhex`;
      
    if (validateColor(color)) {
      color = interaction.options.getString("color").replace("#", "hex");
    } else {
      await interaction.reply({
        content: "The color you entered was invalid, defaulting to dark pink.",
        ephemeral: true,
      });

      color = "pink";
    }

      await interaction.reply(imgURL);
  },
};
