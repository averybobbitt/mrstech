const { ApplicationCommandType, ApplicationCommandOptionType } = require("discord.js");

const name = "role";
const desc = "gives you a new role";
const colors = [
    { name: "light red", value: "light red" },
    { name: "dark red", value: "dark red" },
    { name: "light orange", value: "light orange" },
    { name: "dark orange", value: "dark orange" },
    { name: "light yellow", value: "light yellow" },
    { name: "dark yellow", value: "dark yellow" },
    { name: "light green", value: "light green" },
    { name: "dark green", value: "dark green" },
    { name: "light blue", value: "light blue" },
    { name: "dark blue", value: "dark blue" },
    { name: "light purple", value: "light purple" },
    { name: "dark purple", value: "dark purple" },
    { name: "light pink", value: "light pink" },
    { name: "dark pink", value: "dark pink" },
    { name: "white", value: "white" },
    { name: "black", value: "black" },
    { name: "clear", value: "clear" },
];

module.exports = {
    name: name,
    description: desc,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "color",
            description: "new role color",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: colors,
        },
    ],
    async execute(interaction) {
        const choice = interaction.options.getString("color");
        const newRole = interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === choice);

        // iterate through all colors in colors[] and if member has role, remove
        colors.forEach((c) => {
            // if member has "c" role, remove it
            if (interaction.member.roles.cache.some((r) => r.name.toLowerCase() === c.name)) {
                interaction.member.roles.remove(
                    interaction.guild.roles.cache.find((r) => r.name.toLowerCase() === c.name)
                );
            }
        });

        if (choice !== "clear") interaction.member.roles.add(newRole);

        if (choice == "clear") {
            await interaction.reply({
                content: `Successfully removed color for **${interaction.user}**!`,
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: `Successfully set color for **${interaction.user}** to **${choice}**!`,
                ephemeral: true,
            });
        }
    },
};
