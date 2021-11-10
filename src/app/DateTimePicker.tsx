import React from "react";
import { DateTimePicker, DateTimePickerProps } from "@material-ui/pickers";

function CustomDateTimePicker({ ...props }: DateTimePickerProps) {
    return (
        <DateTimePicker
            // type="date"
            inputVariant="outlined"
            InputProps={{ inputProps: { style: { paddingTop: 10.5, paddingBottom: 10.5 } } }}
            {...props}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
}

export default CustomDateTimePicker;
