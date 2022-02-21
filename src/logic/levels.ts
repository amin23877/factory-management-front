import { nanoid } from "nanoid";

import { IItem } from "../api/items";
import { ILevel } from "../api/level";

export const LEVEL_SEPARATOR = "__";

export const splitLevelName = (name: string): string => {
  const splited = name.split(LEVEL_SEPARATOR);
  return splited[0];
};

export const generateLevelName = (name: string): string => {
  return `${name}${LEVEL_SEPARATOR}${nanoid()}`;
};

export const getVisibilityState = (level: ILevel, item: IItem) => {
  if (level.all) {
    return true;
  }
  return true;
  // for (const fn of level.filterName) {
  //     for (const fv of level.filterValue) {
  //         if (item[fn] && (fv === "all" || item[fn] === fv)) {
  //             return true;
  //         } else {
  //             return false;
  //         }
  //     }
  // }
};
