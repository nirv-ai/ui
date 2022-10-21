import React from "react";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import { Grid } from "Library";
import { AppHeader } from "Components";
import { Theme } from "Theme";
import {
  AuthnzContextProvider,
  authnzDataConfig,
  PlayerContextProvider,
  playerDataConfig,
  type AuthnzDataConfigInterface,
  type PlayerDataConfigInterface,
} from "Data";

export type AppStateType = {
  playerContext: PlayerDataConfigInterface["context"];
  authnzContext: AuthnzDataConfigInterface["context"];
  [x: string]: any;
};

// TODO: add context updator functions to state and pass them into context
export class App extends React.Component<{}, AppStateType> {
  // combines all context updaters into a single type
  updateContext: PlayerDataConfigInterface["context"]["update"] &
    AuthnzDataConfigInterface["context"]["update"];

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

    this.state = {
      playerContext: {
        ...playerDataConfig.context,
        update: this.updateContext,
      },
      authnzContext: {
        ...authnzDataConfig.context,
        update: this.updateContext,
      },
    };
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Container disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container component="section">
              <AuthnzContextProvider context={this.state.authnzContext}>
                <PlayerContextProvider context={this.state.playerContext}>
                  <AppHeader />
                </PlayerContextProvider>
                <Container>
                  <Outlet
                    context={{
                      authnzContext: this.state.authnzContext,
                      playerContext: this.state.playerContext,
                    }}
                  />
                </Container>
              </AuthnzContextProvider>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
