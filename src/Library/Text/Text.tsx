import React from "react";
import { Typography, type TypographyProps } from "@mui/material";

export const TextComponent: React.FC<TypographyProps> = ({
  children,
  ...props
}) => <Typography {...props}>{children}</Typography>;

export const H1: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="h1" />
);

export const H2: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="h2" />
);

export const H3: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="h3" />
);

export const H4: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="h4" />
);

export const H5: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="h5" />
);

export const H6: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="h6" />
);

export const Subtitle: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="subtitle1" />
);

export const SubtitleBold: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="subtitle2" />
);

export const P: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="body1" paragraph />
);

export const Plight: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="body2" paragraph />
);

export const TextBold: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="button" />
);

export const TextLight: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="overline" />
);

export const TextLower: React.FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="caption" />
);
