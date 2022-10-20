import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  AppLandingScreen,
  LearnScreen,
  PlayerDetail,
  PlayerJoinScreen,
  PlayerPlayScreen,
} from "Components";
import { PlayerContextProvider } from "Data";
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
            path: "join/player", // signup
            action: playerActions.validatePlayerJoinForm,
            element: (
              <PlayerContextProvider>
                <PlayerJoinScreen />
              </PlayerContextProvider>
            ),
          },
          {
            path: "play/player", // login
            element: (
              <PlayerContextProvider>
                <PlayerPlayScreen />
              </PlayerContextProvider>
            ),
            action: playerActions.validatePlayerPlayForm,
          },
          {
            path: "learn", // all about NIRV.ai
            element: <LearnScreen />,
          },
          {
            path: "player/:callsign", // a players homepage
            loader: playerLoaders.loadPlayer,
            element: (
              <PlayerContextProvider>
                <PlayerDetail />
              </PlayerContextProvider>
            ),
          },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
