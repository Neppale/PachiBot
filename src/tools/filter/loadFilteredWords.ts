import { pachiLog, PachiLogPrefix } from "../pachilog";
import { Surreal } from "../surreal/surreal";

export type FilteredWord = {
  id?: number;
  word: string;
  serverId: string;
  userId: string;
  filterDate: string;
};

export async function loadFilteredWords(serverId: string) {
  try {
    const surreal = Surreal.getInstance();
    const filteredWords = await surreal.select<FilteredWord>("filteredWords");
    pachiLog(
      `Palavras filtradas carregadas do servidor ${serverId}.`,
      PachiLogPrefix.INFO
    );

    return filteredWords;
  } catch (error) {
    if (error instanceof Error) {
      pachiLog(
        `Não foi possível carregar as palavras filtradas do servidor. Erro: ${error.message}`,
        PachiLogPrefix.ERROR
      );

      return;
    }
  }
}
