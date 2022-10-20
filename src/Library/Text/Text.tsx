import React from "react";
import { Typography, type TypographyProps } from "@mui/material";

export const TextComponent: React.FC<TypographyProps> = ({
  children,
  fontSize = "16px",
  ...props
}) => (
  <Typography fontSize={`calc(${fontSize} + 2vmin)`} {...props}>
    {children}
  </Typography>
);

export const H1: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="36px" {...props} variant="h1" />
);

export const H2: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="32px" {...props} variant="h2" />
);

export const H3: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="28px" {...props} variant="h3" />
);

export const H4: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="24px" {...props} variant="h4" />
);

export const H5: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="h5" />
);

export const H6: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="8px" {...props} variant="h6" />
);

export const Subtitle: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="subtitle1" />
);

export const SubtitleBold: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="subtitle2" />
);

export const P: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="body1" paragraph />
);

export const PSmall: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="body2" paragraph />
);

export const TextBold: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="button" />
);

export const TextLight: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="16px" {...props} variant="overline" />
);

export const TextLower: React.FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="caption" />
);
