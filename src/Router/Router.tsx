import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound } from "Library";

import {
  AppLandingScreen,
  LearnScreen,
  PlayerProfileScreen,
  PlayerJoinScreen,
  PlayerPlayScreen,
  App,
} from "Components";
import { ActionPipeline } from "./Actions";
import { playerLoaders } from "./Loaders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
            action: ActionPipeline,
            element: <PlayerJoinScreen />,
          },
          {
            path: "play/player", // login
            element: <PlayerPlayScreen />,
            action: ActionPipeline,
          },
          {
            path: "logout/player", // login
            // element: <PlayerPlayScreen />,
            action: ActionPipeline,
          },
          {
            path: "learn", // all about NIRV.ai
            element: <LearnScreen />,
          },
          {
            path: "player/:callsign", // a players homepage
            loader: playerLoaders.loadPlayer,
            element: <PlayerProfileScreen />,
          },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
