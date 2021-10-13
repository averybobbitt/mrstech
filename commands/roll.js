import { SlashCommandBuilder } from "@discordjs/builders";

export const data = new SlashCommandBuilder()
  .setName("roll")
  .setDescription("rolls a die (essentially a random number generator)")
  .addIntegerOption((option) => option.setName("args").setDescription("number of sides of the die").setRequired(true));

export async function execute(interaction) {
  roll = Math.floor(Math.random() * interaction.options.getInteger("args") + 1);
  await interaction.reply(`You rolled: **${roll}**`);
}
