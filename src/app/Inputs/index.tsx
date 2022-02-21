import React, { useState, useEffect } from "react";
import { MenuItem, StandardTextFieldProps } from "@material-ui/core";
import TextField from "../TextField";
import useSWR from "swr";

// import styles from "./inputs.module.css";
import { Autocomplete } from "@material-ui/lab";
import { CSSProperties, makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  root: {
    "& .MuiInputBase-root": {
      lineHeight: "1em",
    },
  },
});
interface IMFS {
  request: () => Promise<any>;
  limit?: number;
  label?: string;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
  onChange?: (e: React.ChangeEvent<{}>, newValue: any) => void;
  onBlur?: React.FocusEventHandler<HTMLDivElement>;
  error?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  value?: any;
}
export const MaterialFieldSelect = ({
  request,
  limit,
  getOptionLabel,
  getOptionValue,
  onChange,
  value,
  ...props
}: IMFS) => {
  const [options, setOptions] = useState([]);
  const [findValue, setFindValue] = useState<any>();

  useEffect(() => {
    const t = options.find((o) => getOptionValue(o) === value);
    setFindValue(t);
  }, [value, options, getOptionValue]);

  useEffect(() => {
    request()
      .then((data) => {
        if (limit && limit > 0) {
          setOptions(data.slice(0, limit));
        } else {
          setOptions(data);
        }
      })
      .catch((e) => console.log(e));
  }, [limit, request]);

  return (
    <Autocomplete
      style={props.style as any}
      getOptionLabel={getOptionLabel}
      options={options}
      onChange={onChange}
      onBlur={props.onBlur}
      value={findValue}
      renderInput={(params) => (
        <TextField {...params} label={props?.label} error={props.error} placeholder={props.placeholder} />
      )}
    />
  );
};

interface IOS extends StandardTextFieldProps {
  items: any[];
  itemValueField: string;
  itemTitleField: string;
  keyField?: string;
  inputStyle?: any;
}
export const ObjectSelect = ({ inputStyle, items, itemTitleField, itemValueField, keyField, ...props }: IOS) => {
  const classes = useStyle();
  return (
    <TextField
      {...props}
      select
      style={{ ...props.style, fontSize: "0.8rem", height: "100%" }}
      InputProps={{ inputProps: { style: { lineHeight: "1em" } } }}
      classes={{ root: classes.root }}
    >
      <MenuItem value={undefined}>None</MenuItem>
      {items &&
        items.length >= 0 &&
        items.map((item: any, i) => (
          <MenuItem key={keyField ? item[keyField] : i} value={item[itemValueField]}>
            {item[itemTitleField]}
          </MenuItem>
        ))}
    </TextField>
  );
};

interface CacheFieldSelectProps extends StandardTextFieldProps {
  url: string;
  getOptionList?: (data: any) => any;
  itemValueField: string;
  itemTitleField: string;
  limit?: number;
  keyField?: string;
}
export const CacheFieldSelect = ({
  url,
  getOptionList,
  itemTitleField,
  itemValueField,
  limit,
  keyField,
  ...props
}: CacheFieldSelectProps) => {
  const { data: items } = useSWR(url);

  return (
    <ObjectSelect
      {...props}
      itemTitleField={itemTitleField}
      itemValueField={itemValueField}
      items={getOptionList ? getOptionList(items || []) : items && items.length ? items : []}
    />
  );
};

interface IFieldSelect extends StandardTextFieldProps {
  request: () => Promise<any>;
  getOptionList?: (data: any) => any;
  itemValueField: string;
  itemTitleField: string;
  limit?: number;
  keyField?: string;
}
export const FieldSelect = ({
  keyField,
  request,
  itemValueField,
  itemTitleField,
  limit,
  getOptionList,
  ...props
}: IFieldSelect) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    request()
      .then((data) => {
        if (limit && limit > 0) {
          let options = getOptionList ? getOptionList(data) : data.slice(0, limit);
          setItems(options);
        } else {
          let options = getOptionList ? getOptionList(data) : data;
          setItems(options);
        }
      })
      .catch((e) => console.log(e));
  }, [getOptionList, limit, request]);

  return <ObjectSelect {...props} itemTitleField={itemTitleField} itemValueField={itemValueField} items={items} />;
};

interface IArraySelect extends StandardTextFieldProps {
  items?: any[];
}
export const ArraySelect = ({ items, ...props }: IArraySelect) => {
  return (
    <ObjectSelect
      itemTitleField="item"
      itemValueField="item"
      items={items ? items.map((item) => ({ item: item })) : []}
      {...props}
    />
  );
};

export const BaseSelect = (props: StandardTextFieldProps) => {
  return (
    <TextField {...props} select>
      {props.children}
    </TextField>
  );
};
