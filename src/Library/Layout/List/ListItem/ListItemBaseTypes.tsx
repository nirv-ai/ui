import { type ListItemProps } from "@mui/material";

export type ListDataBaseType = {
  key?: string;
  type: string | "avatar" | "img" | "text";
};
export interface ListItemBaseInterface {
  data: ListDataBaseType;
  listItemProps: ListItemProps;
}
