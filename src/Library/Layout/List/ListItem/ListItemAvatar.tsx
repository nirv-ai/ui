// TODO: need to setup (i.e. read through docs) listItemAvatar, and Avatar from Mui

import type { FC } from "react";
import {
  ListItem as MuiListItem,
  ListItemAvatar as MuiListItemAvatar,
  // Divider, // TODO: enable divider between list items
} from "@mui/material";

import { Avatar } from "Library";
import type { ListItemImgInterface } from "./ListItemImg";

export type ListItemAvatarInterface = ListItemImgInterface;

export const ListItemAvatar: FC<ListItemAvatarInterface> = ({
  data,
  listItemProps,
}) => (
  <MuiListItem {...listItemProps}>
    <MuiListItemAvatar>
      <Avatar {...data} />
    </MuiListItemAvatar>
  </MuiListItem>
);
