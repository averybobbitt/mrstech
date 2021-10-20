import { SlashCommandBuilder } from "@discordjs/builders";
import validateColor from "validate-color";

export const data = new SlashCommandBuilder()
  .setName("osu")
  .setDescription("generates a osu! signature banner")
  .addStringOption((option) => option.setName("player").setDescription("osu! username"))
  .addStringOption((option) => option.setName("color").setDescription("background color"));

export async function execute(interaction) {
  const color = interaction.options.getString("color");
  const username = interaction.options.getString("player");
  const baseURL = `https://lemmmy.pw/osusig/sig.php?colour=${color}&uname=${username}&pp=0&removeavmargin&darktriangles&onlineindicator=undefined&xpbar&xpbarhex`;

  if (validateColor(color)) {
    color = color.replace("#", "hex");
  } else {
    await interaction.reply({
      content: "The color you entered was invalid, defaulting to dark pink.",
      ephemeral: true,
    });
    color = "darkpink";
  }

  await interaction.reply({ files: [new MessageAttachment(baseURL)] });
}
