import type { ActionFunctionArgs } from "react-router-dom";

import {
  getAuthnzStore,
  PLAYER_KEY,
  getPlayerStore,
  BFFEndpoint,
  PLAYERS_PLAY_ROUTE,
  type PlayerDataInterface,
} from "Data";
import { InvalidDataError } from "Errors";

export interface LoginPlayerInterface extends ActionFunctionArgs {
  data: Error | Pick<PlayerDataInterface, "callsign" | "password">;
}
export const loginPlayer = async ({
  data,
  ...args
}: LoginPlayerInterface): Promise<PlayerDataInterface | Error> => {
  if (data instanceof Error) return data;

  // need a pass & name to login
  if (!data.callsign || !data.password) return InvalidDataError();

  try {
    // BFF returns player if valid data
    const { data: response }: { data: { player: PlayerDataInterface } } =
      await BFFEndpoint.post(PLAYERS_PLAY_ROUTE, data);

    // save player to localstorage
    const playerStore = await getPlayerStore();
    playerStore(response.player.callsign, response.player);

    // update authnz
    const authnzStore = await getAuthnzStore();
    authnzStore(PLAYER_KEY, response.player.callsign);

    return response.player;
  } catch (err) {
    console.error("\n\n TODO: unhandled error", err);

    return InvalidDataError();
  }
};
