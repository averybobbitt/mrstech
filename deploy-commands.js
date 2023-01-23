const fs = require("fs");
const { REST, Routes } = require("discord.js");
const dotenv = require("dotenv");

// Initialize environment variables
dotenv.config();

// Initialize commands
const commands = [];
const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

// Push each command to commands array
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Push commands to server
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
