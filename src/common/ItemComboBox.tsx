import React, { useState, useCallback, useMemo, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
// import useSWR from "swr";

import { IItem } from "api/items";
import { get } from "api";

export default function ItemComboBox({
  value,
  onChange,
}: {
  value?: IItem | string;
  onChange: (newValue: IItem | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [options, setOptions] = useState<IItem[]>([]);
  //   const { data: options } = useSWR<{ result: IItem[]; total: number }>(query ? `/item?startswithno=${query}` : `/item`);
  const loading = useMemo(() => open && options.length === 0, [open, options.length]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await get(query ? `/item?startsWithno=${query}` : `/item`);
        setOptions(response.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, [query]);

  const getValue = useCallback(() => {
    if (typeof value === "string") {
      return options?.find((o) => o.id === value);
    } else if (typeof value === "object") {
      return value;
    }
  }, [options, value]);

  return (
    <Autocomplete
      id="item-combo-box"
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.id === (value?.id || "")}
      getOptionLabel={(option) => option.no || option.name || "No-Number"}
      options={options || []}
      loading={loading}
      defaultValue={getValue()}
      value={getValue()}
      onChange={(e, nv) => onChange(nv)}
      onInputChange={(e, v) => setQuery(v)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Item"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
