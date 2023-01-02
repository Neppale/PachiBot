export enum PachiLogPrefix {
  PACHIBOT = "PACHIBOT",
  DEBUG = "DEBUG",
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
}

export function pachiLog(message: string, prefix?: PachiLogPrefix): void {
  console.log(`[${prefix ?? "PACHIBOT"}] ${message}`);
}
