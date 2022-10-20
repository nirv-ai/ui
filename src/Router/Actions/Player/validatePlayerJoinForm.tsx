import { redirect, type ActionFunction } from "react-router-dom";

import { ClientStore, FormDataManager } from "Library";

export const validatePlayerJoinForm: ActionFunction = async ({
  request, // Fetch Request
  params, // url params
}) => {
  const player = FormDataManager.parse(await request.formData());

  const playerStore = await ClientStore({ namespace: "players" });
  playerStore(player.callsign, player);

  return redirect(`/player/${player.callsign}`);
};
