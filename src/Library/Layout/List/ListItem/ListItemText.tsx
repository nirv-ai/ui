import React from "react";
import {
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
} from "@mui/material";

import {
  type ListDataBaseType,
  type ListItemBaseInterface,
} from "./ListItemBaseTypes";

export type ListDataTextType = ListDataBaseType & {
  text?: string;
};

export interface ListItemTextInterface extends ListItemBaseInterface {
  data: ListDataTextType;
}
export const ListItemText: React.FC<ListItemTextInterface> = ({
  data,
  listItemProps,
}) => (
  <MuiListItem key={data.key || data.text} {...listItemProps}>
    <MuiListItemText>{data.text}</MuiListItemText>
  </MuiListItem>
);
