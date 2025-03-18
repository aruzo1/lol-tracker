"use client";

import React from "react";
import { ArrowPathIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { getProfileSuggestions } from "@/features/profiles/server-actions";
import { Profile } from "./profile";

export function ProfilesSearch() {
  const [search, setSearch] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [suggestions, getSuggestions] = React.useActionState(
    getProfileSuggestions,
    null
  );

  React.useEffect(() => {
    if (search.trim() === "") return;

    setIsLoading(true);

    const timeOutId = setTimeout(() => {
      React.startTransition(() => {
        getSuggestions(search);
        setIsLoading(false);
      });
    }, 300);

    return () => clearTimeout(timeOutId);
  }, [getSuggestions, search]);

  return (
    <div className="relative mt-6 w-lg">
      <Popover open={isFocused}>
        <PopoverAnchor>
          <Input
            className="h-12 pl-12"
            placeholder="Search for a summoner"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoComplete="off"
          />
          <MagnifyingGlassIcon className="absolute top-3 left-3 size-6 text-muted-foreground" />
        </PopoverAnchor>

        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)]"
          onOpenAutoFocus={(e) => e.preventDefault()}
          sideOffset={10}
        >
          {isLoading && (
            <ArrowPathIcon className="size-6 animate-spin mx-auto" />
          )}
          {!isLoading && !suggestions && (
            <span className="text-muted-foreground text-sm mx-auto">
              No profiles found
            </span>
          )}
          {!isLoading &&
            suggestions &&
            suggestions.map((profileSuggestion) => (
              <Profile
                key={profileSuggestion.account.puuid}
                {...profileSuggestion}
              />
            ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
