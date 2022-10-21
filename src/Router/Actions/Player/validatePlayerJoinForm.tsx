import { type ActionFunction } from "react-router-dom";

import { InvalidDataError } from "Errors";
import {
  authnzDataConfig,
  ClientStore,
  FormDataManager,
  playerDataConfig,
  PLAYER_KEY,
  type PlayerDataInterface,
} from "Data";

export type ValidatePlayerJoinFormType = Error | PlayerDataInterface;

export const validatePlayerJoinForm: ActionFunction = async ({
  request, // Fetch Request
  params, // url params
}): Promise<ValidatePlayerJoinFormType> => {
  // TODO: need to run clientside validation on this data before checking here
  const formData = FormDataManager.parse(
    await request.formData()
  ) as PlayerDataInterface;

  // TODO: this should be a call to the bff
  // TODO: the bff will never return the password
  const playerStore = await ClientStore({
    namespace: playerDataConfig.store.storeName,
  });
  const player = playerStore(formData.callsign);

  // user already exists
  if (player) return InvalidDataError();

  playerStore(formData.callsign, formData);

  // TODO: this should save a server side JWT
  const authStore = await ClientStore({
    namespace: authnzDataConfig.store.storeName,
  });
  authStore(PLAYER_KEY, formData.callsign);

  return formData;
};
