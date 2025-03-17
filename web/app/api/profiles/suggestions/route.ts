import { getAccountByGameNameAndTagLine } from "@/features/accounts/utils";
import { getSummonerByPuuid } from "@/features/summoners/utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");

  if (!search) {
    return new Response(null, { status: 400 });
  }

  const [gameName, tagLine] = search.split("_");

  if (!gameName || !tagLine) {
    return new Response(null, { status: 400 });
  }

  const account = await getAccountByGameNameAndTagLine(gameName, tagLine);

  if (!account) {
    return new Response(null, { status: 404 });
  }

  const summoner = await getSummonerByPuuid(account.puuid);

  if (!summoner) {
    return new Response(null, { status: 404 });
  }

  return new Response(JSON.stringify([{ ...account, ...summoner }]), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
