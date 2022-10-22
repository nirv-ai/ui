import { type ActionFunctionArgs } from "react-router-dom";

import { type PlayerDataOrErrorType } from "Types";
// import { InvalidDataError } from "Errors";

export interface ValidateNewPlayerInterface<T = PlayerDataOrErrorType>
  extends ActionFunctionArgs {
  data: T;
}

/**
 * clientside player data validation, e.g. when a player joins nirv.ai
 */
export const validateNewPlayer = async ({
  data,
  ...args
}: ValidateNewPlayerInterface): Promise<PlayerDataOrErrorType> => {
  if (data instanceof Error) return data;

  // TODO: need to add clientside validation on this data
  // if (data fails validation) return InvalidDataError
  return data;
};

/**
 * clientside player data validation, e.g. when a player logins
 */
export const validateExistingPlayer = async ({
  data,
  ...args
}: ValidateNewPlayerInterface): Promise<PlayerDataOrErrorType> => {
  if (data instanceof Error) return data;

  // TODO: need to add clientside validation on this data
  // if (data fails validation) return InvalidDataError
  console.info("\n\n existing data validated");
  return data;
};
