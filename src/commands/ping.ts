import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { PachiBotClient } from "../tools/client";
import { Command } from "../tools/command";

export const ping: Command = {
  name: "ping",
  description: "Ping!",
  type: ApplicationCommandType.ChatInput,

  run: async (_client: PachiBotClient, interaction: CommandInteraction) => {
    await interaction.reply("Pong!");
  },
};
