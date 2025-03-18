"use server";

import { serverConfiguation } from "@/lib/server-configuration";
import { Summoner } from "./types";

export async function getSummonerByPuuid(puuid: string) {
  const res = await fetch(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${serverConfiguation.apiKey}`
  );

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Summoner;
}
