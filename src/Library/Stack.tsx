import React from "react";
import { Stack as MuiStack, type StackProps } from "@mui/material";

export interface StackInterface extends StackProps {}

export const Stack: React.FC<StackInterface> = ({
  children,
  spacing = 2,
  ...props
}) => (
  <MuiStack spacing={spacing} {...props}>
    {children}
  </MuiStack>
);
