import { PachiBotClient } from "src/tools/client";
import { PachiLogPrefix, pachiLog } from "../tools/pachilog";
import { filterEmbeds } from "./filterEmbeds";
import { ready } from "./ready";
import { create } from "./create";

export function prepareListeners(client: PachiBotClient): void {
  // TODO: automate process to find all listeners recursively
  const listeners = [ready, create, filterEmbeds];

  listeners.forEach((listener) => listener(client));
  pachiLog(
    `Os seguintes listeners foram registrados: ${listeners
      .map((listener) => listener.name)
      .join(", ")}`,
    PachiLogPrefix.INFO
  );
}
