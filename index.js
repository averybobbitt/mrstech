// IMPORTS
const fs = require("fs");
const path = require("node:path");
const dotenv = require("dotenv");
const { Client, GatewayIntentBits, Collection, REST, Routes } = require("discord.js");

// SETUP
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

init_commands();
init_events();

client.login(process.env.TOKEN);

// FUNCTIONS
function init_commands() {
    const commandsPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
    client.commands = new Collection();
    var count = 0;

    // Push each command to commands array
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if ("execute" in command) {
            console.log(`Creating /${command.name}...`);
            client.commands.set(command.name, command);
            count++;
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "execute" property.`);
        }
    }

    console.log(`Successfully created ${count} commands.`);

    // reset global commands
    (async () => {
        try {
            console.log("Purging global application (/) commands.");

            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                body: [],
            });

            console.log(`Successfully purged global application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();

    // push guild commands to server
    (async () => {
        try {
            console.log("Started refreshing application (/) commands.");

            const data = await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
                body: client.commands,
            });

            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        }
    })();
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
