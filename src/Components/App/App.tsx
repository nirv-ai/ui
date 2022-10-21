import React from "react";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";

import { Grid } from "Library";
import { AppHeader } from "Components";
import { Theme } from "Theme";
import {
  AuthnzContextProvider,
  authnzDataConfig,
  StoreManager,
  ContextManager,
  ContextUpdaterProvider,
  PlayerContextProvider,
  playerDataConfig,
  PLAYER_KEY,
  type AuthnzDataConfigInterface,
  type PlayerDataConfigInterface,
  type ContextManagerInterface,
} from "Data";

export type AppStateType = {
  playerContext: PlayerDataConfigInterface["context"];
  authnzContext: AuthnzDataConfigInterface["context"];
  [x: string]: any;
};

export interface AppStateContextInterface
  extends AppStateType,
    ContextManagerInterface {}

// hook for components rendered via Outlet to access app state & context
// FYI: you can split this up tremendously to provide it piecemiel to components
// ^ instead of sending the whole thing
export const useAppContent = () => useOutletContext<AppStateContextInterface>();

// TODO: add context updator functions to state and pass them into context
export class App extends React.Component<{}, AppStateType> {
  // combines all context updaters into a single type
  updateContext: ContextManagerInterface["updateContext"];

  constructor(props: any) {
    super(props);

    // enables syncing context & state
    // so nested comonents can update context via state
    this.updateContext = (contextName, next) => {
      this.setState((prev: AppStateType) => ({
        [contextName]: {
          ...prev[contextName],
          ...next,
        },
      }));
    };

    const playerStoreData =
      StoreManager.store.namespace(playerDataConfig.store.storeName)() || {};
    const authnzStoreData =
      StoreManager.store.namespace(authnzDataConfig.store.storeName)() || {};

    const authnzContext = { ...authnzDataConfig.context, ...authnzStoreData };
    const playerContext = { ...playerDataConfig.context };

    if (authnzStoreData[PLAYER_KEY]) {
      playerContext[PLAYER_KEY] = playerStoreData[authnzStoreData[PLAYER_KEY]];
    }

    this.state = {
      ContextManager: {
        ...ContextManager,
        updateContext: this.updateContext,
      },
      playerContext,
      authnzContext,
    };
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Container disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container component="section">
              <ContextUpdaterProvider context={this.state.ContextManager}>
                <AuthnzContextProvider context={this.state.authnzContext}>
                  <PlayerContextProvider context={this.state.playerContext}>
                    <AppHeader />
                  </PlayerContextProvider>
                  <Container>
                    <Outlet
                      context={{
                        updateContext: this.updateContext,
                        authnzContext: this.state.authnzContext,
                        playerContext: this.state.playerContext,
                      }}
                    />
                  </Container>
                </AuthnzContextProvider>
              </ContextUpdaterProvider>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
