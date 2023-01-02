import { Events } from "discord.js";
import { CustomLogPrefix, customLog } from "../tools/logger";
import { PachiBotClient } from "src/tools/client";

export function ready(client: PachiBotClient) {
  client.once(Events.ClientReady, async (c) => {
    if (!client.user || !client.application) return;
    customLog(`Pronto! Login feito como ${c.user.tag}`, CustomLogPrefix.INFO);

    await client.application?.commands.set(client.commands);
  });
}
