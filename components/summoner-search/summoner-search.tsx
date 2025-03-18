"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Popover, PopoverContent, PopoverAnchor } from "../ui/popover";
import { SummonerProfile } from "./summoner-profile";
import { ProfileSuggestion } from "@/features/profiles/types";
import { getProfileSuggestions } from "@/features/profiles/server-actions";

function getHashCount(value: string) {
  return (value.match(/#/g) || []).length;
}

enum SearchStatus {
  Empty,
  Searching,
  NotFound,
  Found,
}

export function SummonerSearch() {
  const [showPopover, setShowPopover] = React.useState(false);
  const [searchStatus, setSearchStatus] = React.useState(SearchStatus.Empty);
  const [search, setSearch] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<ProfileSuggestion[]>([]);

  const includesHash = React.useMemo(() => search.includes("#"), [search]);
  const showHint = React.useMemo(
    () => search.length > 0 && !includesHash,
    [search, includesHash]
  );

  const addHash = React.useCallback((value: string) => {
    setSearch(value.trim().replace("#", "") + " #");
  }, []);

  const handleSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (value.length === 0) {
        setSearchStatus(SearchStatus.Empty);
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

  React.useEffect(
    () => setShowPopover(searchStatus !== SearchStatus.Empty),
    [searchStatus]
  );

  const handleSearchKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowRight" && getHashCount(search) === 0) {
        addHash(search);
      }
    },
    [search, addHash]
  );

  const handleFocus = React.useCallback(() => {
    setShowPopover(searchStatus !== SearchStatus.Empty);
  }, [searchStatus]);

  React.useEffect(() => {
    if (search.trim() === "") {
      return;
    }

    setSearchStatus(SearchStatus.Searching);

    const timeOutId = setTimeout(async () => {
      const suggestions = await getProfileSuggestions(search);

      if ("error" in suggestions) {
        return setSearchStatus(SearchStatus.NotFound);
      }

      setSuggestions(suggestions);
      setSearchStatus(SearchStatus.Found);
    }, 300);

    return () => clearTimeout(timeOutId);
  }, [search]);

  return (
    <div className="mt-6 w-lg">
      <Popover open={showPopover}>
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
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                onFocus={handleFocus}
                autoComplete="off"
              />
              <div className="absolute flex items-center h-full top-0 ml-8 -z-10">
                <span className="invisible whitespace-pre">{search} </span>
                <span className="text-muted-foreground select-none">
                  {showHint && "#"}
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
          {searchStatus === SearchStatus.Searching && (
            <ArrowPathIcon className="size-6 animate-spin mx-auto" />
          )}
          {searchStatus === SearchStatus.NotFound && (
            <span className="text-muted-foreground text-sm mx-auto">
              No profiles found
            </span>
          )}
          {searchStatus === SearchStatus.Found &&
            suggestions.map((profileSuggestion) => (
              <SummonerProfile
                key={profileSuggestion.account.puuid}
                {...profileSuggestion}
              />
            ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
