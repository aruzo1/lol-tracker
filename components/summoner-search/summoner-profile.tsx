import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Account } from "@/features/accounts/types";
import { Summoner } from "@/features/summoners/types";
import { getSummonerProfileIconUrl } from "@/features/summoners/urls";

type SummonerProfileProps = {
  account: Account;
  summoner: Summoner;
};

export function SummonerProfile({ account, summoner }: SummonerProfileProps) {
  const summonerIcon = React.useMemo(
    () => getSummonerProfileIconUrl(summoner.profileIconId),
    [summoner.profileIconId]
  );

  return (
    <Link
      href={`/profile/euw1/${account.gameName}-${account.tagLine}`}
      className="flex items-center gap-x-3 hover:bg-muted p-1 rounded-md transition-colors"
    >
      <Image
        src={summonerIcon}
        alt={`${account.gameName}'s lol profile icon`}
        className="rounded-full border"
        width={30}
        height={30}
      />
      <span className="text-muted-foreground text-sm">&#x2022;</span>
      <span className="text-sm">{account.gameName}</span>
      <span className="text-muted-foreground text-sm">&#x2022;</span>
      <span className="text-sm text-muted-foreground">
        {summoner.summonerLevel}lvl
      </span>
    </Link>
  );
}
