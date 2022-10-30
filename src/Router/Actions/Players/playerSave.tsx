// TODO: run clientside validation before saving

import type { ActionFunctionArgs } from "react-router-dom";

import {
  getPlayerStore,
  getAuthnzStore,
  PLAYER_KEY,
  BFFEndpoint,
  PLAYERS_JOIN_ROUTE,
  type PlayerDataInterface,
} from "Data";
import type { PlayerDataOrErrorType } from "Types";
import { InvalidDataError } from "Errors";

export interface SavePlayerInterface {
  data: PlayerDataOrErrorType;
  isNew?: boolean;
}

export interface SavePlayerActionInterface
  extends SavePlayerInterface,
    ActionFunctionArgs {}
/**
 * runs all logic for saving a new player, e.g. to clientStore/db
 * PLEASE fkn validate data before calling this fn
 */
export const saveNewPlayer = async ({
  data,
  ...args
}: SavePlayerActionInterface): Promise<PlayerDataOrErrorType> => {
  if (data instanceof Error) return data;

  // check if we already have user
  const playerStore = await getPlayerStore();
  const playerInStore = playerStore(data.callsign) as
    | PlayerDataInterface
    | undefined;

  console.info("\n\n got player", playerInStore);
  if (playerInStore) return InvalidDataError();

  try {
    const { data: response }: { data: { player: PlayerDataInterface } } =
      await BFFEndpoint.post(PLAYERS_JOIN_ROUTE, data);

    return savePlayer({ data: response.player, isNew: true });
  } catch (err) {
    console.error("\n\n TODO: unhandled error", err);

    return InvalidDataError();
  }
};

// TODO: finish this when starting edit action
/**
 * saves an existing player
 * PLEASE fkn validate data before calling this fn
 */
export const saveExistingPlayer = async ({
  data,
  ...args
}: SavePlayerActionInterface): Promise<PlayerDataOrErrorType> => {
  if (data instanceof Error) return data;

  // TODO: run clientside validation before saving
  return savePlayer({ data, isNew: false });
};

/**
 * saves a new or existing player, depending on the props
 * PLEASE fkn validate data before calling this fn
 * this shouldnt be called by ActionPipeline, but instead by an ActionPipeline action
 * because you have to send an extra prop 'isNew'
 */
export const savePlayer = async ({
  data,
  ...args
}: SavePlayerInterface): Promise<PlayerDataOrErrorType> => {
  if (data instanceof Error) return data;

  const playerStore = await getPlayerStore();

  // save to localStorage
  playerStore(data.callsign, data);

  // TODO: need to save to bff first which should return a JWT
  // TODO: this should save a server side JWT
  const authnzStore = await getAuthnzStore();

  authnzStore(PLAYER_KEY, data.callsign);

  console.info("\n\n player saved");
  return data;
};
