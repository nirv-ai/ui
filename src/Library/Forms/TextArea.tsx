/**
 * you likely want to use TextField with multiline = true
 */
import React from "react";

import {
  TextareaAutosize as MuiTextArea,
  type TextareaAutosizeProps,
} from "@mui/material";

export const TextArea: React.FC<TextareaAutosizeProps> = ({
  minRows = 3,
  ...props
}) => (
  <MuiTextArea
    placeholder={props.placeholder || props.name || ""}
    minRows={minRows}
    {...props}
  />
);
