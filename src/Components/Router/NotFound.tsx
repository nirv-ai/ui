import React from "react";
import { useRouteError } from "react-router-dom";

interface ErrorType {
  statusText: String;
  message: String;
}
export const NotFound = () => {
  const error = useRouteError() as ErrorType;

  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
