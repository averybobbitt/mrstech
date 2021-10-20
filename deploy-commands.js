import { readdirSync } from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { config } from "dotenv";

// Initialize environment variables
config();

// Initialize commands
const commands = [];
const commandFiles = readdirSync("./commands").filter((file) => file.endsWith(".js"));

// Push each command to commands array
commandFiles.forEach((file) => {
  const command = await import(`./commands/${file}`);

  console.log(`loaded: ${command}`);
  console.log(`\t${command.data}`);
  commands.push(command.data.toJSON());
});

// Push commands to server
const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest
  .put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
