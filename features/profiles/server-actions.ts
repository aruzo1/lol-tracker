"use server";

import { getAccountByGameNameAndTagLine } from "@/features/accounts/server-actions";
import { getSummonerByPuuid } from "@/features/summoners/server-actions";

export async function getProfileSuggestions(name: string) {
  if (!name) {
    return { error: "No name provided" };
  }

  const [gameName, tagLine] = name.split("#");

  if (!gameName || !tagLine) {
    return { error: "Invalid name format" };
  }

  const account = await getAccountByGameNameAndTagLine(gameName, tagLine);

  if (!account) {
    return { error: "Account not found" };
  }

  const summoner = await getSummonerByPuuid(account.puuid);

  if (!summoner) {
    return { error: "Summoner not found" };
  }

  return [{ account, summoner }];
}
