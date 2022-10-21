import React from "react";
import { useRouteError } from "react-router-dom";

import { Grid } from "Library";

interface ErrorType {
  statusText: String;
  message: String;
}

export const NotFound = () => {
  const error = useRouteError() as ErrorType;

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
