import React, { useState, useEffect } from "react";

// import styles from "./inputs.module.css";
import { Autocomplete } from "@material-ui/lab";
import { CSSProperties } from "@material-ui/styles";
import { useHistory } from "react-router-dom";
import { InputBase } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
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
            style={props.style as any}
            getOptionLabel={getOptionLabel}
            options={options}
            onChange={onChange}
            onBlur={props.onBlur}
            value={findValue}
            freeSolo={props.freeSolo}
            renderInput={(params) => (
                <div
                    style={{ border: "1px solid #ccc", borderRadius: "4px", display: "flex", height: "36.2px" }}
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
                            borderRight: "1px solid #ccc",
                        }}
                        onClick={() => {
                            if (props.url && value) {
                                history.push(`${props.url}/${value}`);
                            }
                        }}
                    >
                        <SearchRounded />
                        {/* &#128269; */}
                    </span>
                    <InputBase
                        style={{ flex: 1, border: "none", padding: "0px 5px", fontSize: "0.8rem" }}
                        type="text"
                        {...params.inputProps}
                        value={getOptionLabel(findValue)}
                    />
                    {/* <TextField {...params} label={props?.label} error={props.error} placeholder={props.placeholder} /> */}
                </div>
            )}
        />
    );
}
