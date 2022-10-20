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

export type RootStateType = {
  playerContext: Omit<PlayerDataConfigInterface["context"], "contextName">;
  authnzContext: Omit<AuthnzDataConfigInterface["context"], "contextName">;
  [x: string]: any;
};

// TODO: add context updator functions to state and pass them into context
export class Root extends React.Component<{}, RootStateType> {
  updateContext: PlayerDataConfigInterface["context"]["update"] &
    AuthnzDataConfigInterface["context"]["update"];

  constructor(props: any) {
    super(props);

    this.updateContext = (key, next) => {
      this.setState((prev: RootStateType) => ({
        [key]: {
          ...prev[key],
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
              <AuthnzContextProvider>
                <PlayerContextProvider>
                  <AppHeader />
                </PlayerContextProvider>
                <Container>
                  <Outlet />
                </Container>
              </AuthnzContextProvider>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
