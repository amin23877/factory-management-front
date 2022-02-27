import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router";

import { Autocomplete } from "@material-ui/lab";
import { CSSProperties } from "@material-ui/styles";
import { TextField, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchRounded from "@material-ui/icons/SearchRounded";

import "../../styles/dashboard.css";
import { openRequestedSinglePopup } from "../../logic/window";
import { get } from "../../api";

interface IMFS {
  request?: () => Promise<any>;
  limit?: number;
  label?: string;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
  getOptionList: (option: any) => any[];
  onChange?: (e: React.ChangeEvent<{}>, newValue: any) => void;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  error?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  value?: any;
  freeSolo?: any;
  url?: string;
  disabled?: boolean;
  path: string;
  filterLabel: string;
  choseItem?: any;
}

const useStyles = makeStyles({
  root: {
    "& .MuiAutocomplete-inputRoot[class*=MuiOutlinedInput-root]": {
      padding: "0px",
    },
  },
  textField: {
    transform: " translateY(0px)",
    "& input": {
      padding: 11,
      fontSize: "0.8rem",
    },
  },
});

export default function LinkField({
  request,
  limit,
  getOptionLabel,
  getOptionValue,
  getOptionList,
  onChange,
  value,
  path,
  disabled,
  filterLabel,
  choseItem,
  ...props
}: IMFS) {
  const [options, setOptions] = useState<any[]>([]);
  const [selectValue, setSelectValue] = useState<any>(value);
  const [refresh, setRefresh] = useState<any>();
  const classes = useStyles();

  const phone = useMediaQuery("(max-width:900px)");
  const history = useHistory();

  const fetchData = useCallback(() => {
    let params: any = {};
    params["startsWith" + filterLabel] = refresh;
    get(path, { params })
      .then((data) => {
        if (limit && limit > 0) {
          setOptions(data.slice(0, limit) || []);
        } else {
          setOptions(getOptionList(data) || []);
        }
      })
      .catch((e) => console.log(e));
  }, [filterLabel, getOptionList, limit, path, refresh]);

  useEffect(() => {
    const timeOutId = setTimeout(fetchData, 500);
    return () => clearTimeout(timeOutId);
  }, [fetchData]);

  useEffect(() => {
    if (choseItem) {
      setRefresh(choseItem[filterLabel]);
    }
  }, [choseItem, filterLabel]);

  useEffect(() => {
    if (typeof value === "string" && options && options.find) {
      const v = options?.find((item) => getOptionValue(item) === value);
      setSelectValue(v);
    }
  }, [getOptionValue, options, value]);

  useEffect(() => {
    if (typeof value === "string" && options && options.find) {
      const v = options?.find((item) => getOptionValue(item) === value);

      v && v[filterLabel] && setRefresh(v[filterLabel]);
    }
  }, [value]);

  return (
    <Autocomplete
      classes={{
        root: classes.root,
      }}
      style={props.style as any}
      getOptionLabel={getOptionLabel}
      options={options}
      onChange={onChange}
      onBlur={props.onBlur}
      value={selectValue}
      freeSolo
      closeIcon={() => <div style={{ display: "none" }}></div>}
      renderInput={(params) => {
        return (
          <div
            style={{
              borderRadius: "4px",
              display: "flex",
              height: "34.2px",
              border: "1px solid #ccc",
              borderTop: "none",
            }}
            ref={params.InputProps.ref}
          >
            <span
              style={{
                width: "auto",
                height: "100%",
                display: "flex",
                alignItems: "center",
                fontSize: "small",
                cursor: "pointer",
                padding: "0px 3px",
                borderTop: "1px solid #ccc",
                borderRadius: " 4px 0px 0px 4px",
              }}
              onClick={() => {
                if (props.url && value) {
                  phone
                    ? history.push(`${props.url}/${typeof value === "string" ? value : value.id}`)
                    : openRequestedSinglePopup({
                        url: `${props.url}/${typeof value === "string" ? value : value.id}`,
                      });
                }
              }}
            >
              <SearchRounded style={{ fontSize: 10 }} />
            </span>
            <TextField
              {...params.inputProps}
              value={refresh}
              label={props?.label}
              error={props.error}
              placeholder={props.placeholder}
              classes={{
                root: classes.textField,
              }}
              onChange={(e) => {
                setRefresh(e.target.value);
                // setSelectValue({});
                // fetchData();
              }}
              style={{ flex: 1, fontSize: "0.8rem" }}
              type="text"
              InputLabelProps={{ shrink: true, style: { fontSize: "0.8rem" } }}
              disabled={disabled}
            />
          </div>
        );
      }}
    />
  );
}
