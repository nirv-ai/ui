import type { LoaderFunction } from "react-router-dom";

import { BFFEndpoint, PATHS_GET_ROUTE } from "Data";
import { getPathStore, type PathDataInterface } from "Data";
import { PathDoesntExistError } from "Errors";

export type LoadPathType =
  | {
      path: PathDataInterface;
    }
  | Error;

// TODO: this should make a request to the backend
export const loadPath: LoaderFunction = async ({
  request,
  params,
}): Promise<LoadPathType> => {
  const pathStore = await getPathStore();

  try {
    const { data: response }: { data: { path: PathDataInterface } } =
      await BFFEndpoint.post(PATHS_GET_ROUTE, {
        name: params.name,
      });

    pathStore(response.path.name, response.path);

    return response;
  } catch (err) {
    const thisError = err as {
      response?: Record<string, string | number>;
    };

    if (typeof thisError.response?.status !== "undefined") {
      // user doesnt exist
      if (thisError.response.status === 404) {
        // TODO: delete player from localstorage before returning
        return PathDoesntExistError();
      } else console.error("\n\n unknown error in loadPath", err);
    }

    // if no connection, try to retrieve player from playerstore
    const path = pathStore(params.name) as PathDataInterface | undefined;
    if (path) return { path };

    return PathDoesntExistError();
  }
};
