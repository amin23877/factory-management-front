import React, { CSSProperties } from "react";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";

export default function ItemTypeCombo({
  value,
  style,
  onChange,
}: {
  value?: itemType[];
  style?: CSSProperties;
  onChange?: (e: any, nv: itemType[]) => void;
}) {
  return (
    <Autocomplete
      style={style}
      multiple
      options={itemTypes}
      getOptionLabel={(option) => option.value}
      defaultValue={[]}
      filterSelectedOptions
      onChange={onChange}
      value={value || []}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Item Types" placeholder="You can select multiple types" />
      )}
    />
  );
}

type itemType = { value: string };

const itemTypes = [
  { value: "option" },
  { value: "device" },
  { value: "assembly" },
  { value: "fru" },
  { value: "part" },
];
