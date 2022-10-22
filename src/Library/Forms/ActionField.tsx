import type { FC } from "react";
import { ACTION_TYPE } from "Router";

export interface ActionFieldInterface {
  actionType: string;
  hidden?: boolean;
}
export const ActionField: FC<ActionFieldInterface> = ({ actionType }) => (
  <input hidden name={ACTION_TYPE} value={actionType} readOnly />
);
