import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { get } from "api";

const useValue = (initial?: string | any) => {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (typeof initial === "string") {
      get(`/item/${initial}`)
        .then((d) => setValue(d))
        .catch((e) => console.log(e));
    }
  }, [initial]);

  return [value, setValue];
};

export default function AsyncCombo({
  url,
  value,
  filterBy,
  onChange,
  getOptionLabel,
  getOptionSelected,
}: {
  url: string;
  value?: any | string;
  filterBy: string;
  onChange?: (e: any, nv: any) => void;
  getOptionLabel: (o: any) => string;
  getOptionSelected: (o: any, v: any) => boolean;
}) {
  const [selectedValue, setSelectedValue] = useValue(value);
  const [inputValue, setInputValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    if (!open) {
      return;
    }

    const t = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await get(
          inputValue && inputValue !== "" ? `${url}?startsWith${filterBy}=${inputValue}` : url
        );

        if (active) {
          setOptions(response.result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(t);
      active = false;
    };
  }, [filterBy, inputValue, open, url]);

  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={getOptionSelected}
      getOptionLabel={getOptionLabel}
      options={options}
      loading={loading}
      autoComplete
      filterOptions={(x) => x}
      filterSelectedOptions
      value={selectedValue}
      onChange={(e, nv) => {
        setSelectedValue && setSelectedValue(nv);
        onChange && onChange(e, nv);
      }}
      onInputChange={(e, nv) => {
        setInputValue(nv);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Item"
          variant="outlined"
          size="small"
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
