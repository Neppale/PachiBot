import { Surreal } from "../surreal/surreal";

export async function unfilterWord(id: string) {
  // remove everything before ":" from id
  const formattedId = id.split(":")[1];
  const surreal = Surreal.getInstance();
  const response = await surreal.delete("filteredWords", formattedId);

  return response;
}
