import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { PachiBotClient } from "src/tools/client";
import { Command } from "../../tools/command";
import { loadFilteredWords } from "../../tools/filter/loadFilteredWords";

export const filterlist: Command = {
  name: "filterlist",
  description: "Lista todas as palavras filtradas do servidor!",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: PachiBotClient, interaction: CommandInteraction) => {
    await interaction.deferReply();
    const serverId = interaction.guildId;

    const filteredWords = (await loadFilteredWords(serverId!)) || [];

    const finalReply = filteredWords.length
      ? `Palavras filtradas do servidor:
      ${filteredWords.map((filteredWord) => filteredWord.word).join(", ")}`
      : "Não há palavras filtradas no servidor.";

    await interaction.editReply(finalReply);
  },
};
