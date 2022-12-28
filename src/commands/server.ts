import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { PachiBotClient } from "src/tools/client";
import { Command } from "src/tools/command";

export const server: Command = {
  name: "server",
  description: "Server info!",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: PachiBotClient, interaction: CommandInteraction) => {
    if (!interaction.guild) {
      await interaction.reply("This command can only be used in a server!");
      return;
    }
    await interaction.reply(
      `Server name: ${interaction.guild?.name}\nTotal members: ${interaction.guild?.memberCount}`
    );
  },
};
