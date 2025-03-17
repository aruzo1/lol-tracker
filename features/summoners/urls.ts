export const SUMMONER_PROFILE_ICON_URL =
  "https://ddragon.leagueoflegends.com/cdn/15.5.1/img/profileicon";

export function getSummonerProfileIconUrl(iconId: number): string {
  return `${SUMMONER_PROFILE_ICON_URL}/${iconId}.png`;
}
