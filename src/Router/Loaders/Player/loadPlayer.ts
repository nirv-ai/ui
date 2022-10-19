import { type LoaderFunction } from "react-router-dom";

import { type PlayerDataInterface } from "Components";
import { ClientStore } from "Library";

export const loadPlayer: LoaderFunction = async ({
  request,
  params,
}): Promise<{
  player: PlayerDataInterface;
}> => {
  const playerStore = await ClientStore({ namespace: "players" });

  const player = playerStore(params.callsign);

  return { player };
};
