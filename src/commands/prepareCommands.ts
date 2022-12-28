import { readdirSync } from "fs";
import { join } from "path";
import { PachiBotClient } from "../tools/client";
import { Command } from "../tools/command";

export function prepareCommands(client: PachiBotClient): Command[] {
  const commands: Command[] = readdirSync(join(__dirname, "..", "commands"))
    .filter(
      (file: string) => file.endsWith(".ts") && file !== "prepareCommands.ts"
    )
    .map((file: string) => {
      const command: Command = require(join(__dirname, "..", "commands", file));
      return Object.values(command)[0];
    });

  client.commands = commands;

  return commands;
}
