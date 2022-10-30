import type { LoaderFunction } from "react-router-dom";

import { BFFEndpoint, PATHS_GET_ROUTE, PATH_KEY } from "Data";
import { getPathStore, type PathDataInterface } from "Data";
import { PathDoesntExistError } from "Errors";

export type LoadPathType =
  | {
      path: PathDataInterface;
    }
  | Error;

export const loadPath: LoaderFunction = async ({
  request,
  params,
}): Promise<LoadPathType> => {
  const pathStore = await getPathStore();

  try {
    const { data: response }: { data: { path: PathDataInterface } } =
      await BFFEndpoint.get(
        `${PATHS_GET_ROUTE}/${params.pathName!.replace(/-/g, " ")}`
      );

    console.info("\n\n got path", response.path);

    if (!response.path.name) return PathDoesntExistError();

    pathStore(PATH_KEY, response.path);

    return response;
  } catch (err) {
    pathStore(PATH_KEY, "");

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

    // if no connection, try to retrieve path from pathStore
    const path = pathStore(params.name) as PathDataInterface | undefined;
    if (path) return { path };

    return PathDoesntExistError();
  }
};
