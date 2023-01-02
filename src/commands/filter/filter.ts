import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  CommandInteraction,
} from "discord.js";
import moment from "moment";
import { PachiBotClient } from "src/tools/client";
import { Command } from "src/tools/command";

export const filter: Command = {
  name: "filter",
  description: "Filtra palavras específicas da mensagem de um usuário!",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "word",
      description: "Palavra que você deseja filtrar.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (_client: PachiBotClient, interaction: CommandInteraction) => {
    const word: string = interaction.options.get("word")!.value as string;

    const wordData = {
      word,
      serverId: interaction.guildId,
      userId: interaction.user.id,
      filterDate: moment().format("DD/MM/YYYY HH:mm:ss"),
    };

    // TODO: check if word is already filtered. if it is, return an error message.

    const successfulFilterReply = `A palavra "${word}" foi filtrada com sucesso!
  A filtragem foi feita por ${interaction.user.username} às ${wordData.filterDate}.
  Deseja ver todas as palavras filtradas? Use o comando \`/filterlist\`
  Deseja remover uma palavra filtrada? Use o comando \`/filterremove\``;

    const failedFilterReply = `A palavra "${word}" já está filtrada!
  Deseja ver todas as palavras filtradas? Use o comando \`/filterlist\`
  Deseja remover uma palavra filtrada? Use o comando \`/filterremove\``;

    await interaction.reply(successfulFilterReply);
  },
};
