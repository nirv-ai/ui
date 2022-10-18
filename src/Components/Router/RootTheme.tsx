import React from "react";
import { createTheme } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const styleOverrides = `
  body {
    text-align: center;
    font-size: calc(24px + 2vmin);
    background-color: #dddddd;
    color: #282c34;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    p {
      margin: 0;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }
  }
`;
export const RootTheme = createTheme({
  components: {
    MuiCssBaseline: { styleOverrides },
  },
});
