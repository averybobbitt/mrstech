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
