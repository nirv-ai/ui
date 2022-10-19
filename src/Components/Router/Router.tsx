import React from "react";
import {
  createBrowserRouter,
  RouterProvider /*, Route */,
} from "react-router-dom";

import {
  AppLandingScreen,
  LearnScreen,
  PlayerDetails,
  PlayerJoinScreen,
  validatePlayerJoinForm,
} from "Components";
import { NotFound } from "./NotFound";
import { Root } from "./Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        // pathless route enables NotFound to load within Outlet
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <AppLandingScreen />,
          },
          {
            path: "join/player",
            action: validatePlayerJoinForm,
            element: <PlayerJoinScreen />,
          },
          {
            path: "learn",
            element: <LearnScreen />,
          },
          {
            path: "player/:callsign",
            element: <PlayerDetails />,
          },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
