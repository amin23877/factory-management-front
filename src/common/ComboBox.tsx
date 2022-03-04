import React, { useState, useMemo, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { get } from "api";

export default function ComboBox({
  url,
  label,
  value,
  defaultQueries,
  toSearchField,
  onChange,
  getOptionLabel,
  getOptionSelected,
}: {
  url: string;
  label?: string;
  value?: any | string;
  defaultQueries?: any;
  toSearchField?: string;
  onChange: (newValue: any | null) => void;
  getOptionSelected?: (option: any, value: any) => boolean;
  getOptionLabel?: (option: any) => string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [options, setOptions] = useState<any[]>([]);

  const loading = useMemo(() => open && options.length === 0, [open, options.length]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let searchQuery = new URLSearchParams({ ...defaultQueries });
        if (toSearchField && query) {
          searchQuery.append(toSearchField, query);
        }
        const response = await get(searchQuery ? `${url}?${searchQuery.toString()}` : `${url}`);
        setOptions(response.result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, [defaultQueries, query, toSearchField, url]);

  //   const getValue = useCallback(() => {
  //     if (typeof value === "string") {
  //       return options?.find((o) => o.id === value);
  //     } else if (typeof value === "object") {
  //       return options?.find((o) => (getOptionSelected ? getOptionSelected(o, value) : o.id === (value?.id || "")));
  //     }
  //   }, [getOptionSelected, options, value]);

  return (
    <Autocomplete
      freeSolo
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) =>
        getOptionSelected ? getOptionSelected(option, value) : option.id === (value?.id || "")
      }
      getOptionLabel={(option) => (getOptionLabel ? getOptionLabel(option) : option.name || "No-Title")}
      options={options || []}
      loading={loading}
      value={value}
      onChange={(e, nv) => onChange(nv)}
      onInputChange={(e, v) => setQuery(v)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
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
