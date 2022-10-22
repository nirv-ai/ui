// TODO: need to setup (i.e. read through docs) listItemAvatar, and Avatar from Mui

import type { FC } from "react";
import {
  List as MuiList,
  // Divider, // TODO: enable divider between list items
  type ListProps,
  type ListItemProps,
} from "@mui/material";

import { ListItem, type ListItemType } from "./ListItem";

export interface ListInterface {
  listData: ListItemType["data"][][];
  listItemProps?: ListItemProps;
  listProps?: ListProps;
}
export const List: FC<ListInterface> = ({
  listData,
  listItemProps = {},
  listProps = {},
}) => {
  const listItemGroups: React.ReactNode[][] = [];

  listData.forEach((dataGroup, i) => {
    listItemGroups.push([]);
    dataGroup.forEach((data, x) => {
      listItemGroups[i].push(
        <ListItem
          key={`${data.key ?? ""}-${i}-${x}`}
          data={data}
          listItemProps={listItemProps}
        />
      );
    });
  });

  return <MuiList {...listProps}>{listItemGroups}</MuiList>;
};
