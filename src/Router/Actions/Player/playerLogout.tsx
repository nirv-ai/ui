import { redirect, type ActionFunction } from "react-router-dom";

import { getAuthnzStore, PLAYER_KEY } from "Data";

// TODO: still need to update context as it doesnt reload the page
export const logoutPlayer: ActionFunction = async ({
  request, // Fetch Request
  params, // url params
}): Promise<Response> => {
  const authnzStore = await getAuthnzStore();

  authnzStore(PLAYER_KEY, "");

  // TODO: need to logout player on the backend as well

  return redirect("/");
};
