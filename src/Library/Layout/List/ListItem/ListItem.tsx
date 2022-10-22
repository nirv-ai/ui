import type { FC } from "react";

import { ListItemAvatar, type ListItemAvatarInterface } from "./ListItemAvatar";
import { ListItemText, type ListItemTextInterface } from "./ListItemText";

export type ListItemType = ListItemAvatarInterface | ListItemTextInterface;

export const ListItem: FC<ListItemType> = ({ data, listItemProps }) => {
  switch (data.type) {
    case "avatar":
      return <ListItemAvatar data={data} listItemProps={listItemProps} />;
    case "text":
    default: // return text and let consumer deal with it
      return <ListItemText data={data} listItemProps={listItemProps} />;
  }
};
