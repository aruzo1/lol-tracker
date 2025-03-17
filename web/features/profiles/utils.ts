import { ProfileSuggestion } from "./types";

export async function getProfilesSuggestions(name: string) {
  const nameNormalized = name.replace("#", "_");

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/profiles/search?name=${nameNormalized}`
  );

  return (await res.json()) as ProfileSuggestion[];
}
