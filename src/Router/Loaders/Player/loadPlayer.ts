import { type LoaderFunction } from "react-router-dom";

import { type PlayerDataInterface } from "Data";
import { ClientStore, playerDataConfig } from "Data";

export const loadPlayer: LoaderFunction = async ({
  request,
  params,
}): Promise<{
  player: PlayerDataInterface;
}> => {
  const playerStore = await ClientStore({
    namespace: playerDataConfig.store.storeName,
  });

  const player = playerStore(params.callsign);

  return { player };
};
