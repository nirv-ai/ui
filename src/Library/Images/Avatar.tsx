import type { FC } from "react";

import { Avatar as MuiAvatar, type AvatarProps } from "@mui/material";

export interface AvatarInterface extends AvatarProps {
  width?: string | number;
  height?: string | number;
}

export const Avatar: FC<AvatarInterface> = ({ width, height, ...props }) => (
  <MuiAvatar sx={{ width, height }} {...props} />
);
