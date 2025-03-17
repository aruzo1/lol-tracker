"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Popover, PopoverContent, PopoverAnchor } from "../ui/popover";
import { SummonerProfile } from "./summoner-profile";
import { SUMMONERS } from "@/features/summoners/constants";
import { ACCOUNTS } from "@/features/accounts/constants";

function getHashCount(value: string) {
  return (value.match(/#/g) || []).length;
}

export function SummonerSearch() {
  const [showResults, setShowResults] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const includesHash = React.useMemo(() => search.includes("#"), [search]);
  const showHint = React.useMemo(
    () => search.length > 0 && !includesHash,
    [search, includesHash]
  );

  const addHash = React.useCallback((value: string) => {
    console.log(value.trim());
    setSearch(value.trim().replace("#", "") + " #");
  }, []);

  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value.length > 0) {
        setShowResults(true);
      } else {
        setShowResults(false);
      }

      // If there are more than one `#`, don't do anything further
      if (getHashCount(value) > 1) {
        return;
      }

      // If there isn't a `#` and the user adds one, append it with a space
      if (!includesHash && value.includes("#")) {
        addHash(search);
      } else {
        setSearch(value);
      }
    },
    [addHash, search, includesHash]
  );

  const onSearchKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowRight" && getHashCount(search) === 0) {
        addHash(search);
      }
    },
    [search, addHash]
  );

  return (
    <div className="mt-6 w-lg">
      <Popover open={showResults} onOpenChange={setShowResults}>
        <PopoverAnchor asChild>
          <Input asChild>
            <label
              htmlFor="summoner-search"
              className="h-12 relative flex items-center overflow-hidden"
            >
              <MagnifyingGlassIcon className="size-6 text-muted-foreground" />
              <input
                id="summoner-search"
                name="summoner-search"
                className="w-full outline-none ml-2"
                placeholder="Game name + #tagline"
                value={search}
                onChange={onSearchChange}
                onKeyDown={onSearchKeyDown}
                autoComplete="off"
              />
              <div className="absolute flex items-center h-full top-0 ml-8 -z-10">
                <span className="invisible whitespace-pre">{search} </span>
                <span className="text-muted-foreground select-none">
                  {showHint && "#tagline"}
                </span>
              </div>
            </label>
          </Input>
        </PopoverAnchor>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)]"
          onOpenAutoFocus={(e) => e.preventDefault()}
          sideOffset={8}
        >
          {ACCOUNTS.map((account) => {
            const summoner = SUMMONERS.find(
              (summoner) => summoner.puuid === account.puuid
            );

            if (!summoner) {
              return null;
            }

            return (
              <SummonerProfile
                key={account.puuid}
                account={account}
                summoner={summoner}
              />
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
