import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound } from "Library";

import {
  ActionsScreen,
  ActivitiesScreen,
  App,
  AppLandingScreen,
  LearnScreen,
  PathScreen,
  PathsScreen,
  PlayerJoinScreen,
  PlayerPlayScreen,
  PlayerProfileScreen,
  SkillsScreen,
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
            path: "logout/player", // logout
            // element: <PlayerPlayScreen />,
            action: ActionPipeline,
          },
          {
            path: "player/:callsign", // a specific player
            loader: playerLoaders.loadPlayer,
            element: <PlayerProfileScreen />,
          },

          // nirv objects related
          {
            path: "paths", // list of paths
            loader: pathLoaders.loadPaths,
            element: <PathsScreen />,
          },
          {
            path: "paths/:pathName", // a specific path
            loader: pathLoaders.loadPath,
            element: <PathScreen />,
          },
          {
            path: "activities", // list of activities
            // loader: playerLoaders.loadPlayer,
            element: <ActivitiesScreen />,
          },
          {
            path: "actions", // list of actions
            // loader: playerLoaders.loadPlayer,
            element: <ActionsScreen />,
          },
          {
            path: "skills", // list of skills
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
