import React from "react";
import {
  createBrowserRouter,
  RouterProvider /*, Route */,
} from "react-router-dom";

import { PlayerJoinScreen, AppLanding } from "..";
import { NotFound } from "./NotFound";
import { Root } from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <AppLanding />,
      },
      {
        path: "join/player",
        element: <PlayerJoinScreen />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
