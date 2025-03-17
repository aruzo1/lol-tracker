"use client";

import { Input } from "@/components/ui/input";
import React from "react";

export function SummonerSearch() {
  const [search, setSearch] = React.useState("");
  const includesHash = React.useMemo(() => search.includes("#"), [search]);
  const showHint = React.useMemo(
    () => search.length > 0 && !includesHash,
    [search]
  );

  const onSearchChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      // If there are more than one `#`, don't do anything further
      if ((value.match(/#/g) || []).length > 1) {
        return;
      }

      // If there isn't a `#` and the user adds one, append it with a space
      if (!includesHash && value.includes("#")) {
        setSearch(value.trim().replace("#", "") + " #");
      } else {
        setSearch(value);
      }
    },
    [includesHash]
  );

  return (
    <Input asChild>
      <label
        htmlFor="summoner-search"
        className="mt-6 h-12 bg-background relative"
      >
        <input
          id="summoner-search"
          name="summoner-search"
          className="w-full outline-none"
          placeholder="Game name + #tag"
          value={search}
          onChange={onSearchChange}
        />
        <div className="absolute flex items-center h-full top-0">
          <span className="invisible whitespace-pre">{search} </span>
          <span className="text-muted-foreground select-none">
            {showHint && "#"}
          </span>
        </div>
      </label>
    </Input>
  );
}
