import type { FC } from "react";
import { Stack as MuiStack, type StackProps } from "@mui/material";

export type StackInterface = StackProps;

export const Stack: FC<StackInterface> = ({
  children,
  spacing = 2,
  ...props
}) => (
  <MuiStack spacing={spacing} {...props}>
    {children}
  </MuiStack>
);
