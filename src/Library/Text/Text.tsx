import type { FC } from "react";
import { Typography, type TypographyProps } from "@mui/material";

export const TextComponent: FC<TypographyProps> = ({
  children,
  fontSize = "16px",
  gutterBottom = true,
  ...props
}) => {
  const font =
    typeof fontSize === "string" || typeof fontSize === "number"
      ? `calc(${fontSize} + 2vmin)`
      : fontSize;
  return (
    <Typography fontSize={font} gutterBottom={gutterBottom} {...props}>
      {children}
    </Typography>
  );
};

export const H1: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="36px" {...props} variant="h1" />
);

export const H2: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="32px" {...props} variant="h2" />
);

export const H3: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="28px" {...props} variant="h3" />
);

export const H4: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="24px" {...props} variant="h4" />
);

export const H5: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="h5" />
);

export const H6: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="8px" {...props} variant="h6" />
);

export const Subtitle: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="subtitle1" />
);

export const SubtitleBold: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="subtitle2" />
);

export const P: FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="body1" paragraph />
);

export const PSmall: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="body2" paragraph />
);

// TODO: component="a" throws error
export const TextBold: FC<TypographyProps> = (props) => (
  <TextComponent {...props} variant="button" />
);

export const TextLight: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="16px" {...props} variant="overline" />
);

export const TextLower: FC<TypographyProps> = (props) => (
  <TextComponent fontSize="12px" {...props} variant="caption" />
);
