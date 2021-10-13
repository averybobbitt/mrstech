import { SlashCommandBuilder } from "@discordjs/builders";

export const data = new SlashCommandBuilder().setName("ping").setDescription('replies with "Pong!"');

export async function execute(interaction) {
  await interaction.reply("Pong!");
}
