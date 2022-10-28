import type { ActionFunctionArgs } from "react-router-dom";

import {
  getAuthnzStore,
  PLAYER_KEY,
  getPlayerStore,
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

  console.info("\n\n got data", data);

  // need a pass & name to login
  if (!data.callsign || !data.password) return InvalidDataError();

  // TODO: this should be a request to the BFF
  const playerStore = await getPlayerStore();
  const player = playerStore(data.callsign) as PlayerDataInterface | undefined;

  if (!player?.callsign) return InvalidDataError();

  const authnzStore = await getAuthnzStore();

  authnzStore(PLAYER_KEY, player.callsign);

  return player;
};
