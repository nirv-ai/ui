import type { ActionFunctionArgs } from "react-router-dom";

import type { PlayerDataOrErrorType } from "Types";
// import { InvalidDataError } from "Errors";

export interface ValidatePlayerInterface<T = PlayerDataOrErrorType>
  extends ActionFunctionArgs {
  data: T;
}

/**
 * clientside player data validation, e.g. when a player joins nirv.ai
 */
export const validateNewPlayer = async ({
  data,
  ...args
}: ValidatePlayerInterface): Promise<PlayerDataOrErrorType> => {
  if (data instanceof Error) return data;

  // get pass eslint err
  await Promise.resolve();
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
}: ValidatePlayerInterface): Promise<PlayerDataOrErrorType> => {
  if (data instanceof Error) return data;

  // get pass eslint err
  await Promise.resolve();
  // TODO: need to add clientside validation on this data
  // if (data fails validation) return InvalidDataError
  console.info("\n\n existing data validated");
  return data;
};
