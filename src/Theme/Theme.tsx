/**
 * some useful links
 * https://mui.com/material-ui/guides/typescript/#customization-of-theme
 * https://mui.com/material-ui/customization/default-theme/
 * https://bareynol.github.io/mui-theme-creator/
 * https://m2.material.io/inline-tools/color/
 */
// TODO: https://mui.com/material-ui/guides/composition
// TODO: https://mui.com/material-ui/customization/theming

import { createTheme, type LinkProps } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { LinkBehavior } from "./LinkBehavior";

const styleOverrides = `
  body {
    text-align: center;
    background-color: #dddddd;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
        monospace;
    }
  }
`;

export const Theme = createTheme({
  components: {
    MuiCssBaseline: { styleOverrides },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
