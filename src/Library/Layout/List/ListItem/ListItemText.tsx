import type { FC } from "react";
import {
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
} from "@mui/material";

import type {
  ListDataBaseType,
  ListItemBaseInterface,
} from "./ListItemBaseTypes";

export type ListDataTextType = ListDataBaseType & {
  text?: string;
};

export interface ListItemTextInterface extends ListItemBaseInterface {
  data: ListDataTextType;
}
export const ListItemText: FC<ListItemTextInterface> = ({
  data,
  listItemProps,
}) => (
  <MuiListItem {...listItemProps}>
    <MuiListItemText>{data.text}</MuiListItemText>
  </MuiListItem>
);
