const { SlashCommandBuilder } = require("@discordjs/builders");

const roles = [
  "light red",
  "dark red",
  "light orange",
  "dark orange",
  "light yellow",
  "dark yellow",
  "light green",
  "dark green",
  "light blue",
  "dark blue",
  "light purple",
  "dark purple",
  "light pink",
  "dark pink",
  "white",
  "black",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("color")
    .setDescription("sets role color")
    .setStringOption((option) =>
      option
        .setName("color")
        .setDescription("new role color")
        .setRequired(true)
        .addChoice("light red")
        .addChoice("dark red")
        .addChoice("light orange")
        .addChoice("dark orange")
        .addChoice("light yellow")
        .addChoice("dark yellow")
        .addChoice("light green")
        .addChoice("dark green")
        .addChoice("light blue")
        .addChoice("dark blue")
        .addChoice("light purple")
        .addChoice("dark purple")
        .addChoice("light pink")
        .addChoice("dark pink")
        .addChoice("white")
        .addChoice("black")
    ),
  async execute(interaction) {},
};
