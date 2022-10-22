import { Component } from "react";
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
  ContextUpdaterBase,
  ContextUpdaterProvider,
  PLAYER_CONTEXT_NAME,
  PLAYER_KEY,
  PLAYER_STORE_NAME,
  PlayerContextProvider,
  playerDataConfig,
  setStoreManagerOnWindow,
  StoreManager,
  type AuthnzDataConfigInterface,
  type ContextUpdaterInterface,
  type PlayerDataConfigInterface,
  type PlayerDataInterface,
} from "Data";

export interface AppContextInterface {
  [PLAYER_CONTEXT_NAME]: PlayerDataConfigInterface["context"];
  [AUTHNZ_CONTEXT_NAME]: AuthnzDataConfigInterface["context"];
}
export interface AppStateType extends AppContextInterface {
  ContextManager: {
    updateContext: ContextUpdaterInterface["updateContext"];
  };
}

// hook for components rendered via Outlet to access app state & context
// FYI: you can split this up tremendously to provide it piecemiel to components
// ^ instead of sending the whole thing
export const useAppContext = () => {
  useOutletContext<AppStateType>();
};

export type AppProps = object;
export class App extends Component<AppProps, AppStateType> {
  // combines all context updaters into a single type
  updateContext: ContextUpdaterInterface["updateContext"];

  constructor(props: AppProps) {
    super(props);

    // enables syncing context & state
    // so nested comonents can update context via state
    this.updateContext = (contextName, next) => {
      console.info("\n\n updating context", contextName, next);
      this.setState(
        // @ts-expect-error dunno
        (prevState: AppStateType) => ({
          [contextName]: Object.assign(
            {},
            // @ts-expect-error dunno
            prevState[contextName],
            next
          ) as AppContextInterface,
        })
      );
    };

    const playerStoreData =
      StoreManager.store.namespace(PLAYER_STORE_NAME)() || {};
    const authnzStoreData =
      StoreManager.store.namespace(AUTHNZ_STORE_NAME)() || {};

    const authnzContext = { ...authnzDataConfig.context, ...authnzStoreData };
    const playerContext = { ...playerDataConfig.context };

    if (authnzStoreData[PLAYER_KEY]) {
      playerContext[PLAYER_KEY] = playerStoreData[
        authnzStoreData[PLAYER_KEY] as string
      ] as PlayerDataInterface;
    }

    this.state = {
      ContextManager: {
        ...ContextUpdaterBase,
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
    prevProps: Readonly<AppProps>,
    prevState: Readonly<AppStateType>,
    snapshot?: unknown
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
                        authnzContext: this.state[AUTHNZ_CONTEXT_NAME],
                        playerContext: this.state[PLAYER_CONTEXT_NAME],
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
