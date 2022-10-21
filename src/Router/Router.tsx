import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound } from "Library";

import {
  AppLandingScreen,
  LearnScreen,
  PlayerDetail,
  PlayerJoinScreen,
  PlayerPlayScreen,
  App,
} from "Components";
import { playerActions } from "./Actions";
import { playerLoaders } from "./Loaders";

const Div = () => <div>hello</div>;
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
            action: playerActions.validatePlayerJoinForm,
            element: <PlayerJoinScreen />,
          },
          {
            path: "play/player", // login
            element: <PlayerPlayScreen />,
            action: playerActions.validatePlayerPlayForm,
          },
          {
            path: "learn", // all about NIRV.ai
            element: <LearnScreen />,
          },
          {
            path: "player/:callsign", // a players homepage
            loader: playerLoaders.loadPlayer,
            element: <PlayerDetail />,
          },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
