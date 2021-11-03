import React, { useState, useEffect } from "react";

// import styles from "./inputs.module.css";
import { Autocomplete } from "@material-ui/lab";
import { CSSProperties } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { InputBase, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../../styles/dashboard.css";
import { openRequestedSinglePopup } from "../../logic/window";

interface IMFS {
    request: () => Promise<any>;
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
}

const useStyles = makeStyles({
    root: {
        "& .MuiAutocomplete-inputRoot[class*=MuiOutlinedInput-root]": {
            padding: "0px",
        },

        // "& .MuiAutocomplete-inputRoot": {
        //     padding: "1px",
        // },
        // "& .MuiInputLabel-outlined": {
        //     transform: " translate(14px, 11px) scale(1)",
        // },
        // "& .MuiInputLabel-animated": {
        //     transition: "color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        // },
    },
    amin: {
        transform: " translateY(0px)",
    },
});

export default function MaterialFieldSelect({
    request,
    limit,
    getOptionLabel,
    getOptionValue,
    getOptionList,
    onChange,
    value,
    ...props
}: IMFS) {
    const [options, setOptions] = useState<any[]>([]);
    const [findValue, setFindValue] = useState<any>();
    let history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        const t = options?.find((o) => getOptionValue(o) === value);
        console.log(t);
        setFindValue(t);
    }, [value, options, getOptionValue]);

    const fetchData = () => {
        request()
            .then((data) => {
                if (limit && limit > 0) {
                    setOptions(data.slice(0, limit));
                } else {
                    setOptions(getOptionList(data));
                }
            })
            .catch((e) => console.log(e));
    };
    useEffect(() => {
        fetchData();
    }, [limit, request]);

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
            value={findValue}
            freeSolo
            closeIcon={() => <div style={{ display: "none" }}></div>}
            // freeSolo={props.freeSolo}
            renderInput={(params) => (
                <div
                    style={{
                        borderRadius: "4px",
                        display: "flex",
                        height: "34.2px",
                        border: "1px solid #ccc",
                        borderTop: "none",
                        // paddingTop: "0.5px",
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
                            // transform: " translateX(2px)",
                        }}
                        onClick={() => {
                            if (props.url && value) {
                                // history.push(`${props.url}/${value}`);
                                openRequestedSinglePopup({ url: `${props.url}/${value}` });
                            }
                        }}
                    >
                        {/* <SearchRounded /> */}
                        {/* &#128269; */}
                    </span>
                    {/* <InputBase
                        style={{ flex: 1, border: "none", padding: "0px 5px", fontSize: "0.8rem" }}
                        type="text"
                        {...params.inputProps}
                        value={getOptionLabel(findValue)}
                    /> */}
                    <TextField
                        {...params}
                        value={getOptionLabel(findValue)}
                        label={props?.label}
                        error={props.error}
                        placeholder={props.placeholder}
                        {...params.inputProps}
                        classes={{
                            root: classes.amin,
                        }}
                        style={{ flex: 1, fontSize: "0.8rem" }}
                        type="text"
                        // variant="standard"
                    />
                </div>
            )}
        />
    );
}
