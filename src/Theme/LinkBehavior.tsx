import { forwardRef } from "react";
import {
  NavLink as RouterLink,
  type NavLinkProps as RouterLinkProps,
} from "react-router-dom";

/**
 * FYI: you can also just do <AnyMuiComponent component={NavLink} />
 * @see https://mui.com/material-ui/guides/routing/
 * use as import { Link, Button } from '@mui/material, <LinkOrButton href="poop">click me</LinkOrButton>
 */
export const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (MUI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});
