import React, { useState, useEffect } from "react";
import { Autocomplete } from "@material-ui/lab";
import { CSSProperties } from "@material-ui/styles";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchRounded from "@material-ui/icons/SearchRounded";

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
    },
    amin: {
        transform: " translateY(0px)",
        "& input": {
            padding: 9,
        },
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
    const [selectValue, setSelectValue] = useState<any>(value);
    const classes = useStyles();

    useEffect(() => {
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
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit, request]);

    useEffect(() => {
        if (typeof value === "string" && options) {
            const v = options?.find((item) => getOptionValue(item) === value);
            setSelectValue(v);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options, value]);

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
                                    openRequestedSinglePopup({ url: `${props.url}/${value}` });
                                }
                            }}
                        >
                            <SearchRounded style={{ fontSize: 10 }} />
                        </span>
                        <TextField
                            {...params.inputProps}
                            value={getOptionLabel(selectValue)}
                            label={props?.label}
                            error={props.error}
                            placeholder={props.placeholder}
                            classes={{
                                root: classes.amin,
                            }}
                            style={{ flex: 1, fontSize: "0.8rem" }}
                            type="text"
                            InputLabelProps={{ shrink: true }}
                        />
                    </div>
                );
            }}
        />
    );
}
