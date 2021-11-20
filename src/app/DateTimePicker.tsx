import React from "react";
import { DateTimePicker, DateTimePickerProps } from "@material-ui/pickers";

function CustomDateTimePicker({ ...props }: DateTimePickerProps) {
    return (
        <DateTimePicker
            // type="date"
            inputVariant="outlined"
            InputProps={{ inputProps: { style: { paddingTop: 10.5, paddingBottom: 10.5, fontSize: "0.8rem" } } }}
            {...props}
            inputProps={{ style: { fontSize: "0.8rem" } }}
            InputLabelProps={{
                shrink: true,
                style: { fontSize: "0.8rem" },
            }}
        />
    );
}

export default CustomDateTimePicker;
