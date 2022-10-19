import React from "react";
import {
  createBrowserRouter,
  RouterProvider /*, Route */,
} from "react-router-dom";

import {
  AppLandingScreen,
  LearnScreen,
  PlayerDetail,
  PlayerJoinScreen,
} from "Components";
import { playerActions } from "./Actions";
import { playerLoaders } from "./Loaders";
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
            action: playerActions.validatePlayerJoinForm,
            element: <PlayerJoinScreen />,
          },
          {
            path: "learn",
            element: <LearnScreen />,
          },
          {
            path: "player/:callsign",
            loader: playerLoaders.loadPlayer,
            element: <PlayerDetail />,
          },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
