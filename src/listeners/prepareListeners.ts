import { ready } from "./ready";
import { create } from "./create";
import { PachiBotClient } from "src/tools/client";

export function prepareListeners(client: PachiBotClient): void {
  const listeners = [ready, create];

  listeners.forEach((listener) => {
    listener(client);
  });
}
