import type { FC } from "react";
import { Stack as MuiStack, type StackProps } from "@mui/material";

export type StackInterface = StackProps;

export const Stack: FC<StackInterface> = ({ children, ...props }) => (
  <MuiStack spacing={2} {...props}>
    {children}
  </MuiStack>
);
