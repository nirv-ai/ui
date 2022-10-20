import React from "react";

import { Avatar as MuiAvatar, AvatarProps } from "@mui/material";

export interface AvatarInterface extends AvatarProps {
  width: string | number;
  height: string | number;
}

export const Avatar: React.FC<AvatarInterface> = ({
  width,
  height,
  ...props
}) => <MuiAvatar sx={{ width, height }} {...props} />;
