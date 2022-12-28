import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { CustomLogPrefix, customLog } from "./tools/logger";
import { prepareListeners } from "./listeners/prepareListeners";
import { PachiBotClient } from "./tools/client";
import { prepareCommands } from "./commands/prepareCommands";
dotenv.config({
  path: "./.env",
});

const token = process.env.TOKEN;

customLog("Iniciando PachiBot...", CustomLogPrefix.INFO);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
}) as PachiBotClient;

prepareListeners(client);
prepareCommands(client);

client.login(token);
