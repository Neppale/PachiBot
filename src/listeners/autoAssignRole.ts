import { Events } from "discord.js";
import { PachiBotClient } from "../tools/client";

export function autoAssignRole(client: PachiBotClient) {
  client.on(Events.GuildMemberAdd, async (member) => {
    const role = member.guild.roles.cache.find(
      (role) => role.name === "Membro" || role.name === "Membros"
    );
    if (!role) return;
    await member.roles.add(role);
  });
}
