import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputBase, { InputBaseProps } from "@material-ui/core/InputBase";
import MuiTextField, { StandardTextFieldProps } from "@material-ui/core/TextField";

import { SearchRounded } from "@material-ui/icons";

import styles from "./TextField.module.css";

export const SearchBar = () => {
  return (
    <div className={styles.searchBarRoot}>
      <InputBase className={styles.searchInput} placeholder="type the biller you want to pay here" />
      <SearchRounded htmlColor="gray" />
    </div>
  );
};

export interface IBaseTextField extends InputBaseProps {
  label?: string;
  helperText?: React.ReactNode;
  children?: React.ReactNode;
}

export default function TextField(props: StandardTextFieldProps) {
  return (
    <MuiTextField
      inputProps={{ style: { ...props.inputProps?.style, fontSize: "0.8rem" } }}
      InputLabelProps={{ style: { fontSize: "0.8rem" }, ...props.InputLabelProps }}
      variant="outlined"
      size="small"
      {...props}
    />
  );
}

export const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(MuiTextField);
