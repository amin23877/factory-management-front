import React, { useState } from "react";
import { Typography } from "@material-ui/core";

type valueType = string | number | readonly string[];

export default function CustomCell({ value, onChange }: { value?: valueType; onChange: (value: valueType) => void }) {
  const [focused, setFocused] = useState(false);

  if (focused) {
    return (
      <input
        autoFocus
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setFocused(false)}
        value={value}
        style={{ width: "100%" }}
      />
    );
  }

  return <Typography onClick={() => setFocused(true)}>{value}</Typography>;
}
