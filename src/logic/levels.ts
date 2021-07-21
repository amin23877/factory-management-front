import { nanoid } from "nanoid";

export const LEVEL_SEPARATOR = "__";

export const splitLevelName = (name: string): string => {
    const splited = name.split(LEVEL_SEPARATOR);
    return splited[0];
};

export const generateLevelName = (name: string): string => {
    return `${name}${LEVEL_SEPARATOR}${nanoid()}`;
};
