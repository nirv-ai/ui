import { useRouteError, useLoaderData } from "react-router-dom";

import { Grid } from "Library";

interface ErrorType {
  statusText: string;
  message: string;
}

export const NotFound = () => {
  const routeError = useRouteError() as ErrorType;
  const loaderError = useLoaderData() as ErrorType;

  const error = routeError || loaderError;

  console.error(error);

  return (
    <Grid component="article" xs={12}>
      <h2>Oops!</h2>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Grid>
  );
};
