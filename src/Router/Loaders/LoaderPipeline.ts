import type { LoaderFunction } from "react-router-dom";

import * as Errors from "Errors";
import { FormDataManager, type PlayerDataInterface } from "Data";
import * as L from "./LoaderTypes";
// import * as playerLoaders from "./Player";

interface LOADER_TYPE {
  LOADER_TYPE: string;
}

export const LoaderPipeline: LoaderFunction = async ({ request, params }) => {
  const formData = FormDataManager.parse(await request.formData());

  switch (formData.LOADER_TYPE) {
    case L.PLAYER_GET: {
      const { LOADER_TYPE, ...data } = formData as unknown as LOADER_TYPE &
        PlayerDataInterface;
      return console.info("\n\n player loader not yet implemented");
    }
    default:
      return Errors.InvalidDataError();
  }
};
