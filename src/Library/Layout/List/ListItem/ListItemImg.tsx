// TODO: need to setup list item img, @see listitemavatar

import type {
  ListDataBaseType,
  ListItemBaseInterface,
} from "./ListItemBaseTypes";

export type ListDataBaseImgType = ListDataBaseType & {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
};

export interface ListItemImgInterface extends ListItemBaseInterface {
  data: ListDataBaseImgType;
}
