import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound } from "Library";

import {
  AppLandingScreen,
  LearnScreen,
  PlayerProfileScreen,
  PlayerJoinScreen,
  PlayerPlayScreen,
  PathsScreen,
  ActionsScreen,
  SkillsScreen,
  ActivitiesScreen,
  App,
} from "Components";
import { ActionPipeline } from "./Actions";
import { playerLoaders, pathLoaders } from "./Loaders";

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

          // player related
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
            path: "player/:callsign", // a players homepage
            loader: playerLoaders.loadPlayer,
            element: <PlayerProfileScreen />,
          },

          // nirv objects related
          {
            path: "paths", // a players homepage
            loader: pathLoaders.loadPaths,
            element: <PathsScreen />,
          },
          {
            path: "activities", // a players homepage
            // loader: playerLoaders.loadPlayer,
            element: <ActivitiesScreen />,
          },
          {
            path: "actions", // a players homepage
            // loader: playerLoaders.loadPlayer,
            element: <ActionsScreen />,
          },
          {
            path: "skills", // a players homepage
            // loader: playerLoaders.loadPlayer,
            element: <SkillsScreen />,
          },
          {
            path: "learn", // all about NIRV.ai
            element: <LearnScreen />,
          },
        ],
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
