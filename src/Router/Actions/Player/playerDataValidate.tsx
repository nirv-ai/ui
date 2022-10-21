import { type ActionFunctionArgs } from "react-router-dom";

import { type PlayerDataOrErrorType } from "Types";
// import { InvalidDataError } from "Errors";

export interface ValidateNewPlayerInterface<T = PlayerDataOrErrorType>
  extends ActionFunctionArgs {
  data: T;
}

/**
 * clientside player data validation, e.g. when a submitted when a player joins nirv.ai
 */
export const validateNewPlayer = async ({
  data,
  ...args
}: ValidateNewPlayerInterface): Promise<PlayerDataOrErrorType> => {
  if (data instanceof Error) return data;

  // TODO: need to run clientside validation on this data before checking here
  // if (data fails validation) return InvalidDataError
  console.info("\n\n player data validated");
  return data;
};
