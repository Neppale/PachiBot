import {
  ChatInputApplicationCommandData,
  CommandInteraction,
} from "discord.js";
import { PachiBotClient } from "./client";

export interface Command extends ChatInputApplicationCommandData {
  run: (
    client: PachiBotClient,
    interaction: CommandInteraction
  ) => Promise<void>;
}
