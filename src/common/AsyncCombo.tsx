import React, { useState, useEffect, CSSProperties } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box, IconButton } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import TextField from "app/TextField";
import { get } from "api";

const useValue = ({ initial, url }: { initial?: string | any; url: string }) => {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (typeof initial === "string") {
      get(`${url}/${initial}`)
        .then((d) => setValue(d))
        .catch((e) => console.log(e));
    }
  }, []);

  return [value, setValue];
};

export default function AsyncCombo({
  url,
  label,
  value,
  path,
  error,
  style,
  filterBy,
  valueUrl,
  disabled,
  defaultParams,
  onChange,
  getOptionLabel,
  getOptionSelected,
}: {
  url: string;
  label?: string;
  path?: string;
  error?: boolean;
  value?: any | string;
  style?: CSSProperties;
  filterBy: string;
  valueUrl?: string;
  disabled?: boolean;
  defaultParams?: any;
  onChange?: (e: any, nv: any) => void;
  getOptionLabel: (o: any) => string;
  getOptionSelected: (o: any, v: any) => boolean;
}) {
  const [selectedValue, setSelectedValue] = useValue({ initial: value, url: valueUrl || url });
  const [inputValue, setInputValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    let active = true;

    if (!open) {
      return;
    }

    const t = setTimeout(async () => {
      try {
        setLoading(true);
        // const response = await get(
        //   inputValue && inputValue !== "" ? `${url}?startsWith${filterBy}=${inputValue}` : url
        // );
        const response = await get(url, { params: { [`startsWith${filterBy}`]: inputValue, ...defaultParams } });

        if (active) {
          setOptions(response?.result || response);
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
  }, [defaultParams, filterBy, inputValue, open, url]);

  return (
    <Box style={style}>
      {path && (
        <IconButton
          onClick={() => history.push(`/panel${path}/${selectedValue?.id}`)}
          style={{ position: "absolute", padding: 2, margin: "4px 0" }}
        >
          <SearchRounded />
        </IconButton>
      )}
      <Autocomplete
        style={{ width: path ? "84%" : "100%", marginLeft: "auto" }}
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
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={error}
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
    </Box>
  );
}
