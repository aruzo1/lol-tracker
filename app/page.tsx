import { SummonerSearch } from "@/components/summoner-search";

export default function Home() {
  return (
    <div className="flex flex-col items-center mx-auto mt-16">
      <h1 className="text-3xl font-bold">Find Your Summoner</h1>
      <SummonerSearch />
    </div>
  );
}
