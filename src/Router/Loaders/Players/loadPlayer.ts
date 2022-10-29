import type { LoaderFunction } from "react-router-dom";

import { BFFEndpoint, PLAYERS_GET_ROUTE } from "Data";
import { getPlayerStore, type PlayerDataInterface } from "Data";
import { PlayerDoesntExistError } from "Errors";

export type LoadPlayerType =
  | {
      player: PlayerDataInterface;
    }
  | Error;

// TODO: this should make a request to the backend
export const loadPlayer: LoaderFunction = async ({
  request,
  params,
}): Promise<LoadPlayerType> => {
  const playerStore = await getPlayerStore();

  try {
    const { data: response }: { data: { player: PlayerDataInterface } } =
      await BFFEndpoint.get(`${PLAYERS_GET_ROUTE}/${params.callsign!}`);

    playerStore(response.player.callsign, response.player);

    return response;
  } catch (err) {
    const thisError = err as {
      response?: Record<string, string | number>;
    };

    if (typeof thisError.response?.status !== "undefined") {
      // user doesnt exist
      if (thisError.response.status === 404) {
        // TODO: delete player from localstorage before returning
        return PlayerDoesntExistError();
      } else console.error("\n\n unknown error in loadPlayer", err);
    }

    // if no connection, try to retrieve player from playerstore
    const player = playerStore(params.callsign) as
      | PlayerDataInterface
      | undefined;
    if (player) return { player };

    return PlayerDoesntExistError();
  }
};
