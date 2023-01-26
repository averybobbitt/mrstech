// IMPORTS
const fs = require("fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { Client, GatewayIntentBits, REST, Routes, Collection } = require("discord.js");

// SETUP
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

init_commands();
init_events();

client.login(process.env.TOKEN);

// FUNCTIONS
function init_commands() {
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
    client.commands = new Collection();

    // Push each command to commands array
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }

        console.log(`Registered ${command.name}`);
    }

    // Push commands to server
    rest.put(Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
        body: client.commands,
    })
        .then(() => console.log("Successfully registered application commands."))
        .catch(console.error);
}

function init_events() {
    const eventsPath = path.join(__dirname, "events");
    const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}
