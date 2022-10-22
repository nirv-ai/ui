import type { LoaderFunction } from "react-router-dom";

import { getPlayerStore, type PlayerDataInterface } from "Data";
import { PlayerDoesntExistError } from "Errors";

export type LoadPlayerType =
  | {
      player: PlayerDataInterface;
    }
  | Error;

export const loadPlayer: LoaderFunction = async ({
  request,
  params,
}): Promise<LoadPlayerType> => {
  const playerStore = await getPlayerStore();

  const player = playerStore(params.callsign) as
    | PlayerDataInterface
    | undefined;
  if (player) return { player };

  return PlayerDoesntExistError();
};
