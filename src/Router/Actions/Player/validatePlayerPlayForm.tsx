import { type ActionFunction } from "react-router-dom";

import {
  authnzDataConfig,
  ClientStore,
  FormDataManager,
  playerDataConfig,
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
  const playerStore = await ClientStore({
    namespace: playerDataConfig.store.storeName,
  });
  const player = playerStore(formData.callsign) as PlayerDataInterface;

  // user doesnt exist
  if (!player) return InvalidDataError();

  // TODO: this should save a server side JWT
  const authStore = await ClientStore({
    namespace: authnzDataConfig.store.storeName,
  });
  authStore(authnzDataConfig.store.keys.player, player.callsign);

  return player;
};
