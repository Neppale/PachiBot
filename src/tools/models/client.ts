import { Client, ClientOptions } from "discord.js";
import { Command } from "./command";

export class PachiBotClient extends Client {
  commands: Command[] = [];

  constructor(options: ClientOptions) {
    super(options);
    this.commands = [];
  }
}
