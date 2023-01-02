import { Events } from "discord.js";
import { PachiLogPrefix, pachiLog } from "../tools/pachilog";
import { PachiBotClient } from "src/tools/client";

export function ready(client: PachiBotClient) {
  client.once(Events.ClientReady, async (c) => {
    if (!client.user || !client.application) return;
    pachiLog(`Pronto! Login feito como ${c.user.tag}`, PachiLogPrefix.INFO);

    await client.application?.commands.set(client.commands);
  });
}
