import type { ActionFunction } from "react-router-dom";

import * as Errors from "Errors";
import { FormDataManager, type PlayerDataInterface } from "Data";
import * as A from "./ActionTypes";
import * as playerActions from "./Player";

interface ACTION_TYPE {
  ACTION_TYPE: string;
}

export const ActionPipeline: ActionFunction = async ({ request, params }) => {
  const formData = FormDataManager.parse(await request.formData());

  switch (formData.ACTION_TYPE) {
    case A.PLAYER_JOIN: {
      const { ACTION_TYPE, ...data } = formData as unknown as ACTION_TYPE &
        PlayerDataInterface;

      const playerValidated = await playerActions.validateNewPlayer({
        data,
        request,
        params,
      });

      const newPlayerData = await playerActions.saveNewPlayer({
        data: playerValidated,
        request,
        params,
      });

      return newPlayerData;
    }
    case A.PLAYER_PLAY: {
      const { ACTION_TYPE, ...data } = formData as unknown as ACTION_TYPE &
        PlayerDataInterface;

      const playerValidated = await playerActions.validateExistingPlayer({
        data,
        request,
        params,
      });

      const existingPlayer = await playerActions.loginPlayer({
        data: playerValidated,
        request,
        params,
      });

      return existingPlayer;
    }
    case A.PLAYER_LOGOUT: {
      return playerActions.logoutPlayer({ request, params }) as unknown;
    }
    case A.PLAYER_EDIT: {
      return console.info("\n\n got player logout", formData);
    }
    case A.PLAYER_DELETE: {
      return console.info("\n\n got player logout", formData);
    }
    default:
      return Errors.InvalidDataError();
  }
};
