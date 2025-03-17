import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getSummonerProfileIconUrl } from "@/features/summoners/urls";
import { Profile } from "@/features/profiles/types";

export function SummonerProfile(profile: Profile) {
  const summonerIcon = React.useMemo(
    () => getSummonerProfileIconUrl(profile.profileIconId),
    [profile]
  );

  return (
    <Link
      href={`/profile/euw1/${profile.gameName}-${profile.tagLine}`}
      className="flex items-center gap-x-3 hover:bg-muted p-1 rounded-md transition-colors"
    >
      <Image
        src={summonerIcon}
        alt={`${profile.gameName}'s lol profile icon`}
        className="rounded-full border"
        width={30}
        height={30}
      />
      <span className="text-muted-foreground text-sm">&#x2022;</span>
      <span className="text-sm">{profile.gameName}</span>
      <span className="text-muted-foreground text-sm">&#x2022;</span>
      <span className="text-sm text-muted-foreground">
        {profile.summonerLevel}lvl
      </span>
    </Link>
  );
}
