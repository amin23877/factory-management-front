import React from "react";

import { ArraySelect } from "app/Inputs";
import { splitLevelName } from "logic/levels";
import { ILevel } from "api/level";

export default function Level({
  level,
  handleBlur,
  handleChange,
  values,
}: {
  level: ILevel;
  values: any;
  handleChange: any;
  handleBlur: any;
}) {
  return (
    <ArraySelect
      items={level.valid || []}
      name={level.name}
      label={splitLevelName(level.name)}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[level.name]}
    />
  );
}
