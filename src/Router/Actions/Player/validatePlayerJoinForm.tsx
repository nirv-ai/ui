import { redirect, type ActionFunction } from "react-router-dom";

import { ClientStore, FormDataManager } from "Library";

export const validatePlayerJoinForm: ActionFunction = async ({
  request, // Fetch Request
  params, // url params
}) => {
  const player = FormDataManager.parse(await request.formData());

  console.info("\n\n got player", player);

  const playerStore = await ClientStore({ namespace: "players" });
  playerStore(player.callsign, player);

  console.info("\n\n saving player", player);

  return redirect(`/player/${player.callsign}`);
};
