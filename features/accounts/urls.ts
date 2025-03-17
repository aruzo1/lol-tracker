export const PROFILE_ICON_URL =
  "https://ddragon.leagueoflegends.com/cdn/15.5.1/img/profileicon";

export function getProfileIconUrl(iconId: number) {
  return `${PROFILE_ICON_URL}/${iconId}.png`;
}