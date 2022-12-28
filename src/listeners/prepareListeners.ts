import { ready } from "./ready";
import { create } from "./create";
import { PachiBotClient } from "src/tools/client";
import { filterEmbeds } from "./filterEmbeds";
import { CustomLogPrefix, customLog } from "../tools/logger";

export function prepareListeners(client: PachiBotClient): void {
  const listeners = [ready, create, filterEmbeds];

  listeners.forEach((listener) => {
    listener(client);
  });
  customLog(
    `Os seguintes listeners foram registrados: ${listeners
      .map((listener) => listener.name)
      .join(", ")}`,
    CustomLogPrefix.INFO
  );
}
