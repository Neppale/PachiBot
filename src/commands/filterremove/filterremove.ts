import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  CommandInteraction,
} from "discord.js";
import { PachiBotClient } from "../../tools/client";
import { Command } from "../../tools/command";

export const filterRemove: Command = {
  name: "filterremove",
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
    const word: string = interaction.options.get("word")!.value as string;

    // TODO: check if word is already filtered. if it is, return an error message.

    const successfulFilterReply = `A palavra "${word}" foi removida da filtragem com sucesso!
    Deseja ver todas as palavras filtradas? Use o comando \`/filterlist\`
    Deseja filtrar uma palavra? Use o comando \`/filter\``;

    const failedFilterReply = `A palavra "${word}" não está filtrada!
    Deseja ver todas as palavras filtradas? Use o comando \`/filterlist\`
    Deseja filtrar uma palavra? Use o comando \`/filter\``;

    await interaction.reply(successfulFilterReply);
  },
};
