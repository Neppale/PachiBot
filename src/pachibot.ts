import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { PachiLogPrefix, pachiLog } from "./tools/pachilog";
import { prepareListeners } from "./listeners/prepareListeners";
import { PachiBotClient } from "./tools/client";
import { prepareCommands } from "./commands/prepareCommands";
dotenv.config({
  path: "./.env",
});

const token = process.env.TOKEN;

pachiLog("Iniciando PachiBot...", PachiLogPrefix.INFO);

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
