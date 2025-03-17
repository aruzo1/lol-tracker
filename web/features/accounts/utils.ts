import { Account } from "./types";

export async function getAccountByGameNameAndTagLine(
  gameName: string,
  tagLine: string
): Promise<Account | null> {
  const res = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=RGAPI-c42b7d58-d1ba-4e88-83c8-e414747db842`
  );

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Account;
}
