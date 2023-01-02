import { Surreal } from "../surreal/surreal";
import { FilteredWord } from "./loadWordsFromDatabase";

export async function filterWord(filteredWord: FilteredWord) {
  const surreal = Surreal.getInstance();
  const response = await surreal.insert("filteredWords", {
    word: filteredWord.word,
    serverId: filteredWord.serverId,
    userId: filteredWord.userId,
    filterDate: filteredWord.filterDate,
  });

  return response;
}
