import type { LoaderFunction } from "react-router-dom";

import {
  BFFEndpoint,
  PATHS_GET_ROUTE,
  getPathStore,
  PATHS_KEY,
  type PathDataInterface,
} from "Data";
import { PathDoesntExistError } from "Errors";

export type LoadPathsType =
  | {
      paths: PathDataInterface[];
    }
  | Error;

export const loadPaths: LoaderFunction = async ({
  request,
  params,
}): Promise<LoadPathsType> => {
  const pathStore = await getPathStore();

  try {
    const { data: response }: { data: { paths: PathDataInterface[] } } =
      // pager: { params: { name: 'after this one'}}
      await BFFEndpoint.get(PATHS_GET_ROUTE);

    // replace the array in localstorage, let webworker deal with cache
    pathStore(PATHS_KEY, response.paths);

    return response;
  } catch (err) {
    const thisError = err as {
      response?: Record<string, string | number>;
    };

    if (typeof thisError.response?.status !== "undefined") {
      // paths doesnt exist
      if (thisError.response.status === 404) {
        // TODO: delete player from localstorage before returning
        return PathDoesntExistError();
      } else console.error("\n\n unknown error in loadPath", err);
    }

    return PathDoesntExistError();
  }
};
