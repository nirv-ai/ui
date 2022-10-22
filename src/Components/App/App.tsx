import React from "react";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";

import { Grid } from "Library";
import { AppHeader } from "Components";
import { Theme } from "Theme";

import {
  AUTHNZ_CONTEXT_NAME,
  AUTHNZ_STORE_NAME,
  AuthnzContextProvider,
  authnzDataConfig,
  ContextManager,
  ContextUpdaterProvider,
  PLAYER_CONTEXT_NAME,
  PLAYER_KEY,
  PLAYER_STORE_NAME,
  PlayerContextProvider,
  playerDataConfig,
  setStoreManagerOnWindow,
  StoreManager,
  type AuthnzDataConfigInterface,
  type ContextManagerInterface,
  type PlayerDataConfigInterface,
} from "Data";

export type AppStateType = {
  [PLAYER_CONTEXT_NAME]: PlayerDataConfigInterface["context"];
  [AUTHNZ_CONTEXT_NAME]: AuthnzDataConfigInterface["context"];
  [x: string]: any;
};

export interface AppStateContextInterface
  extends AppStateType,
    ContextManagerInterface {}

// hook for components rendered via Outlet to access app state & context
// FYI: you can split this up tremendously to provide it piecemiel to components
// ^ instead of sending the whole thing
export const useAppContext = () => {
  useOutletContext<AppStateContextInterface>();
};

// TODO: add context updator functions to state and pass them into context
export class App extends React.Component<{}, AppStateType> {
  // combines all context updaters into a single type
  updateContext: ContextManagerInterface["updateContext"];

  constructor(props: any) {
    super(props);

    // enables syncing context & state
    // so nested comonents can update context via state
    this.updateContext = (contextName, next) => {
      console.info("\n\n updating context", contextName, next);
      this.setState((prevState: AppStateType, prevProps) => ({
        [contextName]: {
          ...prevState[contextName],
          ...next,
        },
      }));
    };

    const playerStoreData =
      StoreManager.store.namespace(PLAYER_STORE_NAME)() || {};
    const authnzStoreData =
      StoreManager.store.namespace(AUTHNZ_STORE_NAME)() || {};

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
      [PLAYER_CONTEXT_NAME]: playerContext,
      [AUTHNZ_CONTEXT_NAME]: authnzContext,
    };

    console.info("\n\n state set", this.state);
  }

  componentDidMount(): void {
    setStoreManagerOnWindow();
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<AppStateType>,
    snapshot?: any
  ): void {
    console.info("\n\n app updated", this.state);
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Container disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container component="section">
              <ContextUpdaterProvider context={this.state.ContextManager}>
                <AuthnzContextProvider
                  context={this.state[AUTHNZ_CONTEXT_NAME]}
                >
                  <PlayerContextProvider
                    context={this.state[PLAYER_CONTEXT_NAME]}
                  >
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
