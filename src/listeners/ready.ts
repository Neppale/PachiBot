import { ApplicationCommandDataResolvable, Client, Events } from "discord.js";
import { CustomLogPrefix, customLog } from "../tools/logger";
import { PachiBotClient } from "src/tools/client";

export function ready(client: PachiBotClient) {
  client.once(Events.ClientReady, (c) => {
    customLog(`Pronto! Login feito como ${c.user.tag}`, CustomLogPrefix.INFO);
  });

  client.on(Events.ClientReady, async () => {
    if (!client.user || !client.application) return;

    await client.application?.commands.set(client.commands);
    customLog(
      `Os seguintes comandos foram registrados: ${client.commands
        .map((command) => command.name)
        .join(", ")}`,
      CustomLogPrefix.INFO
    );
  });
}
