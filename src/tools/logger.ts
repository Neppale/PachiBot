export enum CustomLogPrefix {
  PACHIBOT = "PACHIBOT",
  ERROR = "ERROR",
  WARNING = "WARNING",
  INFO = "INFO",
}

export function customLog(message: string, prefix?: CustomLogPrefix): void {
  console.log(`[${prefix ?? "PACHIBOT"}] ${message}`);
}
