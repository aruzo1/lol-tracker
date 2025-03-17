"use client";

import React from "react";
import { Input } from "@/components/ui/input";

function getHashCount(value: string) {
  return (value.match(/#/g) || []).length;
}

export function SummonerSearch() {
  const [search, setSearch] = React.useState("");
  const includesHash = React.useMemo(() => search.includes("#"), [search]);
  const showHint = React.useMemo(
    () => search.length > 0 && !includesHash,
    [search, includesHash]
  );

  const addHash = React.useCallback((value: string) => {
    setSearch(value.trim().replace("#", "") + " #");
  }, []);

  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      // If there are more than one `#`, don't do anything further
      if (getHashCount(value) > 1) {
        return;
      }

      // If there isn't a `#` and the user adds one, append it with a space
      if (!includesHash && value.includes("#")) {
        addHash(value);
      } else {
        setSearch(value);
      }
    },
    [addHash, includesHash]
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
    <Input asChild>
      <label htmlFor="summoner-search" className="mt-6 h-12 relative">
        <input
          id="summoner-search"
          name="summoner-search"
          className="w-full outline-none"
          placeholder="Game name + #tagline"
          value={search}
          onChange={onSearchChange}
          onKeyDown={onSearchKeyDown}
          autoComplete="off"
        />
        <div className="absolute flex items-center h-full top-0 -z-10">
          <span className="invisible whitespace-pre">{search} </span>
          <span className="text-muted-foreground select-none">
            {showHint && "#"}
          </span>
        </div>
      </label>
    </Input>
  );
}
