export type Account = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type Summoner = {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};
