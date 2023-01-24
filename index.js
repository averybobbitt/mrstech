// Require the necessary classes
const fs = require("fs");
const dotenv = require("dotenv");
const { Client, GatewayIntentBits } = require("discord.js");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// Initialize environment variables
dotenv.config();

// Set up interaction
init_commands();
init_events();

// Login to Discord with the client's token
client.login(process.env.TOKEN);

// initialize and handle commands
function init_commands() {
    const commands = [];
    const commandFiles = fs.readdirSync("./commands").filter((file) => file.endsWith(".js"));

    // Push each command to commands array
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }

    // Push commands to server
    rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands })
        .then(() => console.log("Successfully registered application commands."))
        .catch(console.error);
}

// initialize and handle events
function init_events() {
    const events = fs.readdirSync("./events").filter((file) => file.endsWith(".js"));
    for (const file of events) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}
