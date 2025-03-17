import { Profile } from "./types";

export async function getProfilesSuggestions(search: string) {
  const searchNormalized = search.replace("#", "_");

  const res = await fetch(
    `/api/profiles/suggestions?search=${searchNormalized}`
  );

  return (await res.json()) as Profile[];
}
