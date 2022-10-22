// TODO: need to finish button types from docs: https://mui.com/material-ui/react-button
import React from "react";
import { Button as MuiButton, type ButtonProps } from "@mui/material";
import { useSubmit, type SubmitOptions } from "react-router-dom";

import { ContextUpdaterContext, AUTHNZ_CONTEXT_NAME, PLAYER_KEY } from "Data";
import { PLAYER_LOGOUT } from "Router";

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

export const ButtonLogout = () => {
  const submit = useSubmit();
  const { updateContext } = React.useContext(ContextUpdaterContext);

  const logoutData = { ACTION_TYPE: PLAYER_LOGOUT };
  const submitOptions: SubmitOptions = {
    method: "post",
    action: "logout/player",
  };
  const handleClick = () => {
    updateContext(AUTHNZ_CONTEXT_NAME, { [PLAYER_KEY]: "" });
    submit(logoutData, submitOptions);
  };
  return <ButtonText onClick={handleClick}>logout</ButtonText>;
};
