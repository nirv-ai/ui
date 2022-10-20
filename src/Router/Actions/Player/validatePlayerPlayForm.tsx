import { redirect, type ActionFunction } from "react-router-dom";

import { ClientStore, FormDataManager } from "Library";

export const validatePlayerPlayForm: ActionFunction = async ({
  request, // Fetch Request
  params, // url params
}) => {
  const formData = FormDataManager.parse(await request.formData());

  const playerStore = await ClientStore({ namespace: "players" });

  const player = playerStore(formData.callsign);

  if (player?.password === formData.password)
    return redirect(`/player/${player.callsign}`);
};
