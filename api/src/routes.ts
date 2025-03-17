import { Router } from "express";
import { getAccountByGameNameAndTagLine, getSummonerByPuuid } from "./services";

export const router = Router();

router.get("/profiles/search", async (req, res) => {
  const name = req.query.name as string;

  if (!name) {
    res.sendStatus(400);
    return;
  }

  const [gameName, tagLine] = name.split("_");

  if (!gameName || !tagLine) {
    res.sendStatus(400);
    return;
  }

  const account = await getAccountByGameNameAndTagLine(gameName, tagLine);

  if (!account) {
    res.sendStatus(404);
    return;
  }

  const summoner = await getSummonerByPuuid(account.puuid);

  if (!summoner) {
    res.sendStatus(404);
    return;
  }

  res.json([{ account, summoner }]);
});
