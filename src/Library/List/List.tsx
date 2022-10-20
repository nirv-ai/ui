// TODO: need to setup (i.e. read through docs) listItemAvatar, and Avatar from Mui
// TODO: move avatar into its own component

import React from "react";
import {
  List as MuiList,
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  ListItemAvatar as MuiListItemAvatar,
  Avatar as MuiAvatar,
  Divider,
  type ListProps,
} from "@mui/material";

export type ListDataBaseType = {
  key?: string;
};
export type ListDataTextType = ListDataBaseType & {
  text: string;
  type: "text";
};

export type ListDataImgType = ListDataBaseType & {
  src: string;
  alt: string;
  type: "img";
  width: number | string;
  height: number | string;
};

export type ListDataItemType = ListDataImgType | ListDataTextType;

export interface ListInterface {
  listData: ListDataItemType[][];
}

export const createListItem = (data: ListDataItemType) => {
  switch (data.type) {
    case "img":
      return (
        <MuiListItem key={data.key || data.src}>
          <MuiListItemAvatar>
            <MuiAvatar
              alt={data.alt}
              src={data.src}
              sx={{ width: data.width, height: data.height }}
            />
          </MuiListItemAvatar>
        </MuiListItem>
      );
    case "text":
      return (
        <MuiListItem key={data.key || data.text}>
          <MuiListItemText>{data.text}</MuiListItemText>
        </MuiListItem>
      );
  }
};

export const List: React.FC<ListInterface> = ({ listData }) => {
  const listItemGroups: React.ReactNode[][] = [];

  listData.forEach((dataGroup, i) => {
    listItemGroups.push([]);
    dataGroup.forEach((dataItem) => {
      listItemGroups[i].push(createListItem(dataItem));
    });
  });

  return <MuiList>{listItemGroups}</MuiList>;
};
