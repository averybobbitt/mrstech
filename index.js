// Require the necessary classes
import { readdirSync } from "fs";
import { Client, Collection, Intents } from "discord.js";
import { config } from "dotenv";

// Initialize environment variables
config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Initialize commands
client.commands = new Collection();
const commandDir = readdirSync("./commands").filter((file) => file.endsWith(".js"));

for (const file of commandDir) {
  const command = require(`./commands/${file}`);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

// Event handling
const events = readdirSync("./events").filter((file) => file.endsWith(".js"));
for (const file of events) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Login to Discord with the client's token
client.login(process.env.TOKEN);
