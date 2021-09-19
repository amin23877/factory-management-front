import React, { useState } from "react";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import useSWR from "swr";

import TextField from "../../../app/TextField";

import { ICustomerType } from "../../../api/customerType";
import CustomerTypeModal from "./CustomerType";

const filter = createFilterOptions<ICustomerType>();

export default function CustomerTypeAutocomplete() {
    const { data: customerTypes } = useSWR<ICustomerType[]>("/customerType");
    const [value, setValue] = useState<ICustomerType | null>(null);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            setOpen(true);
                        });
                    } else if (newValue && newValue.inputValue) {
                        setOpen(true);
                    } else {
                        setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params) as ICustomerType[];

                    if (params.inputValue !== "") {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                options={customerTypes || []}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === "string") {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(option) => option.name}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Client Type" />}
            />

            <CustomerTypeModal open={open} onClose={() => setOpen(false)} />
        </>
    );
}
