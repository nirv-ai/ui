// TODO: need to finish button types from docs: https://mui.com/material-ui/react-button
import React from "react";
import { Button as MuiButton, type ButtonProps } from "@mui/material";

export interface ButtonInterface extends ButtonProps {}

export const ButtonBase: React.FC<ButtonInterface> = ({
  children,
  ...props
}) => <MuiButton {...props}>{children}</MuiButton>;

export const Button: React.FC<ButtonInterface> = (props) => (
  <ButtonBase {...props} variant="contained" />
);

export const ButtonFlat: React.FC<ButtonInterface> = (props) => (
  <ButtonBase {...props} variant="contained" disableElevation />
);

export const ButtonText: React.FC<ButtonInterface> = (props) => (
  <ButtonBase {...props} variant="text" />
);

export const ButtonOutline: React.FC<ButtonInterface> = (props) => (
  <ButtonBase {...props} variant="outlined" />
);
