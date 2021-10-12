const { SlashCommandBuilder } = require("@discordjs/builders");

const colors = [
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
    .setName("role")
    .setDescription("gives you a new role")
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription("new role color")
        .setRequired(true)
        .addChoice("light red", "light red")
        .addChoice("dark red", "dark red")
        .addChoice("light orange", "light orange")
        .addChoice("dark orange", "dark orange")
        .addChoice("light yellow", "light yellow")
        .addChoice("dark yellow", "dark yellow")
        .addChoice("light green", "light green")
        .addChoice("dark green", "dark green")
        .addChoice("light blue", "light blue")
        .addChoice("dark blue", "dark blue")
        .addChoice("light purple", "light purple")
        .addChoice("dark purple", "dark purple")
        .addChoice("light pink", "light pink")
        .addChoice("dark pink", "dark pink")
        .addChoice("white", "white")
        .addChoice("black", "black")
        .addChoice("clear", "clear")
    ),
  async execute(interaction) {
    const gRoles = interaction.guild.roles;
    const mRoles = interaction.member.roles;
    const choice = interaction.options.getString("color");
    const newRole = gRoles.cache.find((r) => r.name.toLowerCase() === choice);

    colors.forEach((color) => {
      const oldRole = gRoles.cache.find((r) => r.name.toLowerCase() === color);
      if (mRoles.cache.some((r) => r.name.toLowerCase() === color)) mRoles.remove(oldRole);
    });

    if (choice !== "clear") mRoles.add(newRole);

    await interaction.reply({
      content: "Successfully updated user color!",
      ephemeral: true,
    });
  },
};
