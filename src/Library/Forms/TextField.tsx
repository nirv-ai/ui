import type { FC } from "react";

import { TextField as MuiTextField, type TextFieldProps } from "@mui/material";

const sx = {
  label: {
    textTransform: "uppercase",
  },
};

export const TextField: FC<TextFieldProps> = ({
  variant = "outlined",
  required = true,
  label,
  ...props
}) => (
  <MuiTextField
    required={required}
    variant={variant}
    label={label ?? props.name}
    {...props}
    sx={sx}
  />
);
