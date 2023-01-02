import { readdirSync } from "fs";
import { join } from "path";
import { PachiBotClient } from "../tools/models/client";
import { Command } from "../tools/models/command";
import { PachiLogPrefix, pachiLog } from "../tools/pachilog";

export function prepareCommands(client: PachiBotClient): void {
  const commands: Command[] = readdirSync(join(__dirname, "..", "commands"), {
    withFileTypes: true,
  })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => {
      const command: Command = require(join(
        __dirname,
        "..",
        "commands",
        dirent.name,
        dirent.name + ".ts"
      ));
      if (dirent.name === "prepareCommands") return;
      return Object.values(command)[0];
    });

  client.commands = commands;

  pachiLog(
    `Os seguintes comandos foram registrados: ${commands
      .map((command) => command.name)
      .join(", ")}`,
    PachiLogPrefix.INFO
  );
}
