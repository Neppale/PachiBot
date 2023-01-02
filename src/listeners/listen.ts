import { Events } from "discord.js";
import { PachiBotClient } from "../tools/client";
import { PachiLogPrefix, pachiLog } from "../tools/pachilog";

export function listen(client: PachiBotClient) {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.find(
      (command) => command.name === interaction.commandName
    );

    if (!command) return;

    try {
      command.run(client, interaction);
    } catch (error) {
      if (error instanceof Error) {
        pachiLog(error.message, PachiLogPrefix.ERROR);
      }
      await interaction.reply({
        content: "Houve um erro ao executar este comando!",
        ephemeral: true,
      });
    }
  });
}
