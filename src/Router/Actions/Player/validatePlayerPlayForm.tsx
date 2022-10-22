import type { ActionFunction } from "react-router-dom";

import {
  getPlayerStore,
  getAuthnzStore,
  FormDataManager,
  PLAYER_KEY,
  type PlayerDataInterface,
} from "Data";
import { InvalidDataError } from "Errors";

export type ValidatePlayerPlayFormType = Error | PlayerDataInterface;

export const validatePlayerPlayForm: ActionFunction = async ({
  request, // Fetch Request
  params, // url params
}): Promise<ValidatePlayerPlayFormType> => {
  const formData = FormDataManager.parse(await request.formData());

  // TODO: this should be a request to the bff
  // TODO: the bff will never return the password
  const playerStore = await getPlayerStore();
  const player = playerStore(formData.callsign) as
    | PlayerDataInterface
    | undefined;

  // user doesnt exist
  if (!player) return InvalidDataError();

  // TODO: this should save a server side JWT
  const authnzStore = await getAuthnzStore();
  authnzStore(PLAYER_KEY, player.callsign);

  return player;
};
