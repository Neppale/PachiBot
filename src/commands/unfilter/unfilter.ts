import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  CommandInteraction,
} from "discord.js";
import { PachiBotClient } from "../../tools/client";
import { Command } from "../../tools/command";
import { unfilterWord } from "../../tools/filter/unfilterWord";
import { loadFilteredWords } from "../../tools/filter/loadFilteredWords";

export const unfilter: Command = {
  name: "unfilter",
  description: "Remove uma palavra filtrada!",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "word",
      description: "Palavra que você deseja remover da filtragem.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (_client: PachiBotClient, interaction: CommandInteraction) => {
    await interaction.deferReply();
    const word: string = interaction.options.get("word")!.value as string;

    const filteredWords = await loadFilteredWords(interaction.guildId!);
    if (!filteredWords || !filteredWords.length) {
      await interaction.editReply("Não há palavras filtradas neste servidor!");
      return;
    }

    const filteredWord = filteredWords.find(
      (filteredWord) => filteredWord.word === word
    );

    const finalReply = `${
      filteredWord
        ? `A palavra ${word} foi removida da filtragem con sucesso!`
        : `A palavra ${word} não está filtrada!`
    }
  Deseja ver todas as palavras filtradas? Use o comando \`/filterlist\`
  Deseja filtrar uma palavra? Use o comando \`/filter\``;

    await interaction.editReply(finalReply);

    if (filteredWord) await unfilterWord(filteredWord.id!);
  },
};
