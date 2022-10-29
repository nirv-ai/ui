import type { LoaderFunction } from "react-router-dom";
import type { AxiosResponse } from "axios";

import { BFFEndpoint } from "Data";
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
    const { data }: { data: { player: PlayerDataInterface } } =
      await BFFEndpoint.post("/v1/player", {
        callsign: params.callsign,
      });

    playerStore(data.player.callsign, data.player);

    return data;
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
