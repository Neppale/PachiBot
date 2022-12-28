import { ApplicationCommandType, SlashCommandBuilder } from "discord.js";
import { Command } from "src/tools/command";

// export const data = new SlashCommandBuilder()
//   .setName("user")
//   .setDescription("Retorna dados sobre o usuário");
// async function execute(interaction: any) {
//   await interaction.reply(
//     `Seu nome de usuário é: ${interaction.user.username}, seu ID é ${interaction.user.id}, você entrou no servidor em ${interaction.member.joinedAt}.`
//   );
// }

export const user: Command = {
  name: "user",
  description: "Retorna dados sobre o usuário",
  type: ApplicationCommandType.ChatInput,
  run: async (_client: any, interaction: any) => {
    await interaction.reply(
      `Seu nome de usuário é: ${interaction.user.username}, seu ID é ${interaction.user.id}, você entrou no servidor em ${interaction.member.joinedAt}.`
    );
  },
};
