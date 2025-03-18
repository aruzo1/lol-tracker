"use server";

import { getAccountByGameNameAndTagLine } from "@/features/accounts/server-actions";
import { getSummonerByPuuid } from "@/features/summoners/server-actions";
import { ProfileSuggestion } from "./types";

export async function getProfileSuggestions(
  prevState: ProfileSuggestion[] | null,
  name: string
) {
  if (!name) {
    return null;
  }

  const [gameName, tagLine] = name.split("#");

  if (!gameName || !tagLine) {
    return null;
  }

  const account = await getAccountByGameNameAndTagLine(gameName, tagLine);

  if (!account) {
    return null;
  }

  const summoner = await getSummonerByPuuid(account.puuid);

  if (!summoner) {
    return null;
  }

  return [{ account, summoner }];
}
