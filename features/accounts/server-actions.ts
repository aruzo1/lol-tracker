"use server";

import { serverConfiguation } from "@/lib/server-configuration";
import { Account } from "./types";

export async function getAccountByGameNameAndTagLine(
  gameName: string,
  tagLine: string
) {
  const res = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${serverConfiguation.apiKey}`
  );

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Account;
}
