import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { PachiBotClient } from "src/tools/client";
import { Command } from "src/tools/command";

export const filterlist: Command = {
  name: "filterlist",
  description: "Lista todas as palavras filtradas do servidor!",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: PachiBotClient, interaction: CommandInteraction) => {
    const serverId = interaction.guildId;
    // TODO: get all filtered words from database. for now, just return a message.
    const filteredWords = ["palavra1", "palavra2", "palavra3"];
    const filteredWordsReply = `As palavras filtradas neste servidor são:
    ${filteredWords.join(", ")}`;

    await interaction.reply(filteredWordsReply);
  },
};
