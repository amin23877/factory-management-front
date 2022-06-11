import React, { CSSProperties } from "react";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";

export default function ItemTypeCombo({
  value,
  style,
  onChange,
  disabled,
}: {
  value?: itemType;
  style?: CSSProperties;
  disabled?: boolean;
  onChange?: (e: any, nv: itemType | null) => void;
}) {
  return (
    <Autocomplete
      style={style}
      // multiple
      // defaultValue={[]}
      options={itemTypes}
      getOptionLabel={(option) => option?.title || "No-Title"}
      disabled={disabled}
      filterSelectedOptions
      onChange={(e, nv) => onChange && onChange(e, nv)}
      value={value}
      renderInput={(params) => <TextField {...params} variant="outlined" label="Item Type" />}
    />
  );
}

type itemType = { value: string; title?: string };

const itemTypes = [
  { value: "option", title: "Option" },
  { value: "device", title: "Device" },
  { value: "assembly", title: "Assembly" },
  { value: "fru", title: "FRU" },
  { value: "part", title: "Part" },
];
